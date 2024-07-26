//imports
import react, { useRef } from 'react';
import { useCallback, useEffect, useState, componentDidMount } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import axios from 'axios'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import $ from 'jquery'; 
import { Children } from 'react';
import { Delta } from 'quill';


//get url params to access user and notebook data
const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');
const docRef = doc(db, "users", user, "notebooks", nb);

//gemini setup
const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);


//quill toolbar setup
const TOOLBAR = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    [ "blockquote", "code-block"],
    ["clean"],
  ]

  document.onkeydown = (KeyboardEvent) => {
    if( KeyboardEvent.key == "ArrowRight"){

    }
  }



//authors view - writing (quill) + suggestion effect
export default function TextEditor() {
    
    //constants
    const [suggest, setSuggestText] = useState(null);
    const [userText, setUserText] = useState("");
    const [comments, setComments] = useState([]);
    const [readyForCom, setReadyForCom] =  useState(false);
    const [loading, setLoading] = useState(false);
    const [insert, setInsert] = useState(false);
    const [focuses, SetFocuses] = useState([]);
    const [focusString, setFocusString] = useState("");
    const [inspos, setInspos] = useState([]);
    const [inspoString, setInspoString] = useState("");

    //text generation
    useEffect(() => {
        //get focuses
        getDoc(doc(db, "users", user, "notebooks", nb))
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                        // Access document fields here
                        SetFocuses(data.focuses)
                    } else {
                        // Document not found
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
        });
        let sentence = ""
        if( focuses != null){
            focuses.forEach((focus,idx) => {
                sentence += focus + ", "
            })
        }
        setFocusString(sentence)

        //text set
        if( userText == null || userText.length < 5 || userText.trim() == "" || userText.trim() == " "){
            setSuggestText("At your service!")
        } else {
            //call and display proompt result
            const delayDebounceFn = setTimeout(() => {
                
                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-pro",
                    systemInstruction: "You are skilled and highly creative " + focusString + "author who is working on a new "
                                + "project. You want to add two to six sentences at a time to your current project. " 
                                + "You take careful note of what has previously been input to inform your additions "
                                + "to the story. You do not introduce new characters, but you do try to advance the "
                                + "plot. You only use what has already been provided as input to determine the "
                                + "characters, but you can introduce new settings. You suggest new additions to "
                                + "the story as if they were direct continuations of input without retyping what " 
                                + "you've already wrote. Do not add any newlines after your output",
                  });
                  
                const generationConfig = {
                    temperature: 1,
                    topP: 0.95,
                    topK: 64,
                    maxOutputTokens: 8192,
                    responseMimeType: "text/plain",
                };
                
                const safetySettings = [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    },
                ];

                //gemini config
                const result = model.generateContent(userText,
                    generationConfig,
                    safetySettings
                )
                .then((response) => {
                    try{
                        setSuggestText(response.response.candidates[0].content.parts[0].text)
                    } catch {
                        console.log(response)
                    }
                    setInsert(true)
                })
                .catch((error) => {
                    setSuggestText("hmm... lets try that again")
                })
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [userText])

    useEffect(() => {
        if(insert) {
            try{
                navigator.clipboard.writeText(suggest)
            } catch {
                setSuggestText("Hmm... lets try that again")
            }
            setInsert(false)
        }
    }, [insert])

    useEffect(() => {
        if(userText.length >= 100 ){
            setReadyForCom(true)
        } else {
            setReadyForCom(false)
        }
    },[userText])

    //generate comments
    function commentGeneration() {

        //check document length and then generate comments
        if( !readyForCom ){
            setComments([{
                'Range': [0,1],
                'Text':'100 or more words required for quality commenting'
            }])
        } else {
            setLoading(true)
            //get inspos
            getDoc(doc(db, "users", user, "notebooks", nb))
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        const data = docSnapshot.data();
                            // Access document fields here
                            setInspos(data.inspos)
                        } else {
                            // Document not found
                            console.log("No such document!");
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting document:", error);
                });
            let sentence = ""
            if( inspos != null) {
                inspos.forEach((inspo,idx) => {
                    sentence += inspo.title +", by " + inspo.author + ", in the genre(s) " 
                            + inspos.genre + ", containing the text " + inspos.text + ", "
                })
            }
            setInspoString(sentence)

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                systemInstruction: "You are a literary professor providing feedback through comments on students' essays. " 
                                + "You provide robust and thorough comments and a concluding statement to help them continue "
                                + "with their writing. You do not comment on every sentence though, instead keeping your "
                                + "comments to about 1 comment for every 250 words, and make sure there is atleast a 20 "
                                + "word buffer between your comments. you also adress grammatical mistakes, but they are not your "
                                + "priority. I am inspired by: " + inspoString + " and would like your help moving my writing in "
                                + "this direction. Try and keep your comments under 75 words.  \n\n\nDo this by emulating this Json Schema: "
                                + "[{\"Location\": int (the distance in words between this and the previous comment), "
                                + "\"Text\": \"str (your comment on how they can improve, do not use quotation marks inside your comment)\"]"
            });
            
            const generationConfig = {
                temperature: 1,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            };

                const result = model.generateContent(userText,
                    generationConfig,
                )
                .then((response) => {
                    let text = response.response.candidates[0].content.parts[0].text
                    try{
                        if( text.slice(0,7) == "```json"){
                            setComments(JSON.parse(text.substring(8, text.length - 3)))
                        } else {
                            setComments(JSON.parse(text))
                        }
                    } catch(error) {
                        setComments([{'Range': [0,1], 'Text': "Sorry about that, please try again"}])
                        console.log(text)
                        console.log(error)
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
    }

    //quill editor mount
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return

        //quill attach to wrapper
        wrapper.innerHTML = ''
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar: TOOLBAR,
                history: {
                    delay: 2000,
                    maxStack: 500,
                    userOnly: true
                  },
            }
        })

        //access document text on load
        getDoc(docRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    // Access document fields here
                    q.setContents(data.text)
                } else {
                    // Document not found
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
        });

        //save document changes
        q.on("text-change", () => {
            setUserText(q.getText())
            updateDoc(docRef, {
                text: q.getContents().ops
            })
        })
    }, [])
    //view
    return (
        <div>
            <div className="suggestion">{suggest}</div>
            <button className='comment-button' onClick={commentGeneration}>Generate Comments</button>
            {(comments.length > 0 && loading == false) &&
                <div className='comment-box'>
                    {comments.map((comment, idx) => 
                        <div key={idx}>
                            {Array.from({length: (comment.Location / 17)}).map((_, id) => (
                                <div className='spacer' key={id} />
                            ))}
                            <div className='comment'>{comment.Text}</div>
                        </div>
                    )}
                </div> }
            {loading == true &&
                <div className='loading'>
                    <div className="loadingio-spinner-double-ring-nq4q5u6dq7r"><div className="ldio-x2uulkbinbj">
                    <div></div>
                    <div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    </div></div>
                </div>
            }
            <div className='sug-input' >cmd-v to add to text</div>
            <div className="container" ref={wrapperRef}></div>
        </div>

    );
}
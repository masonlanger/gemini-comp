//imports
import react, { useRef } from 'react';
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp, Timestamp, deleteDoc } from 'firebase/firestore'
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
const userRef = doc(db, "users", user);
let name = "anonymous"
let pubID = null
try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        if( data.username != ""){
            name = data.username;
        }
        if( data.publishedID != null){
            pubID = data.publishedID;
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
} catch {
    name = "anonymous"
}

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

  let toSuggest = ""
  document.addEventListener('keydown', (event) => { 
    if(event.key === "ArrowRight"){
        if (event.repeat) return;
        const doc = document.getElementsByClassName("ql-editor")[1]
        doc.innerHTML = doc.innerHTML.trimEnd()
        doc.lastElementChild.append(toSuggest)
    }
   });

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
    const [published, setPublished] = useState(false);
    const [getData, setGetData] = useState(true);
    const [pubLoading, setPubLoading] = useState(false)

    //get publishing status
    useEffect(() => {
        if(getData == true){
            //get focuses
            getDoc(docRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        const data = docSnapshot.data();
                        // Access document fields here
                        setPublished(data.published)

                    } else {
                        // Document not found
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
            });
        }
        setGetData(false);
    },[getData])

    //suggestion generation
    useEffect(() => {
        //get focuses
        getDoc(doc(db, "users", user, "notebooks", nb))
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                        // Access document fields here
                        SetFocuses(data.focuses)
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
        if( focuses != null){
            focuses.forEach((focus,idx) => {
                sentence += focus + ", "
            })
        }
        setFocusString(sentence)

        let sent = ""
        if( inspos != null) {
            inspos.forEach((inspo,idx) => {
                sent += inspo.title +", by " + inspo.author + ", in the genre(s) " 
                        + inspos.genre + ", containing the text " + inspos.text + ", "
            })
        }
        setInspoString(sent)


        //text set
        if( userText == null || userText.length < 5 || userText.trim() == "" || userText.trim() == " "){
            setSuggestText("At your service!")
        } else {
            //call and display proompt result
            const delayDebounceFn = setTimeout(() => {
                
                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-pro",
                    systemInstruction: "You are skilled and highly creative " + focusString + "author who is working on a new "
                                + "project, and writes in those styles. You are inspired by " + inspoString + "You "
                                + "want to add two to six sentences at a time to your current project. Never suggest more than 100 words." 
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
                    console.log(error)
                })
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [userText])

    //get suggestion text into clipboard
    useEffect(() => {
        if(insert) {
            try{
                toSuggest = suggest
            } catch {
                setSuggestText("Hmm... lets try that again")
            }
            setInsert(false)
        }
    }, [insert])

    //check for comment readiness
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
            if( inspos != null) {
                inspos.forEach((inspo,idx) => {
                    sentence += inspo.title +", by " + inspo.author + ", in the genre(s) " 
                            + inspos.genre + ", containing the text " + inspos.text + ", "
                })
            }
            setInspoString(sentence)

            let sent = ""
            if( focuses != null){
                focuses.forEach((focus,idx) => {
                    sent += focus + ", "
                })
            }
            setFocusString(sent)

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                systemInstruction: "You are a literary professor providing feedback through comments on students' essays. The "
                                + "student wants to focus on " + focusString + "You provide robust and thorough comments "
                                + "distributed evenly throughout their work. You do not comment on every sentence though, instead keeping your "
                                + "comments to about 1 comment for every 250 words, and make sure there is atleast a 20 "
                                + "word buffer between your comments. you also adress grammatical mistakes, but they are not your "
                                + "priority. I am inspired by: " + inspoString + " and would like your help moving my writing in "
                                + "this direction. Try and keep your comments under 60 words and never exceed 75.  \n\n\nDo this by emulating this Json Schema: "
                                + "[{\"Location\": int (the distance in words between this and the previous comment), "
                                + "\"Text\": \"str (75 words or less, your comment on how they can improve, do not use quotation marks inside your comment)\"]"
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

    //publish notebook
    function publishNotebook() {
        setPubLoading(true)
        getDoc(docRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        const data = docSnapshot.data();

                        const model = genAI.getGenerativeModel({
                            model: "gemini-1.5-pro",
                            systemInstruction: "Provide a genre classification based on the content provided in "
                            + "input. Try and provide 1 to 2 main genres, and up to 5 sub genres. Score the text "
                            + "based on its creativity, grammatical correctness, coherency, novelty, and structure. "
                            + "Give all scores at an equal frequency."
                            + "\nDon't use \\\" anywhere.\nDo this using this JSON schema:\n{\"Genre\": "
                            + "str,\n\"Subgenres\": str,\n\"Level\": str ( choose from Secondary, post-secondary, "
                            + "graduate, professional),\n\"Creativity\": {\"Score\": int (out of 20, most stories "
                            + "should get below a 14),\"Explanation\": str}\n\"Grammar\": {\"Score\": int (out of "
                            + "20, most stories should get below a 14),\"Explanation\": str}\n\"Coherency\": {\"Score\": "
                            + "int (out of 20, most stories should get below a 14),\"Explanation\": str}\n\"Novelty\": "
                            + "{\"Score\": int (out of 20, most stories should get below a 14),\"Explanation\": str}\n"
                            + "\"Structure\": {\"Score\": int (out of 20, most stories should get below a 14),\"Explanation\": "
                            + "str}\n\"Overall\": {\"Score\": int (out of 100, most stories should below a 70),\""
                            + "Explanation\": str}\n}\n\nMake sure Overall score's score category "
                            + "is equal to the total of Creativity's score, Grammar's score, Coherency's score, "
                            + "Novelty's score and Structure's score. Provide no additional output."
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
                            let score = {
                                "Genre": "undefined",
                                "Subgenres": "undefined",
                                "Level": "Secondary",
                                "Creativity_score": 10,
                                "Creativity_explanation": "Hmm... lets try that again",
                                "Coherency_score": 10,
                                "Coherency_explanation": "Hmm... lets try that again",
                                "Grammar_score": 10,
                                "Grammar_explanation": "Hmm... lets try that again",
                                "Novelty_score": 10,
                                "Novelty_explanation": "Hmm... lets try that again",
                                "Structure_score": 10,
                                "Structure_explanation": "Hmm... lets try that again",
                                "Overall_score": 10,
                                "Overall_explanation": "Hmm... lets try that again",
                            }   
                            try{
                                if( text.slice(0,7) == "```json"){
                                    score = JSON.parse(text.substring(8, text.length - 3))
                                } else {
                                    score = JSON.parse(text)
                                    // Access document fields here
                                }
                                // Access document fields here
                                addDoc(collection(db, "published"), {
                                    title: data.name,
                                    text: data.text,
                                    published: serverTimestamp(),
                                    author: name,
                                    updated: serverTimestamp(),
                                    genres: score.Genre,
                                    preview: userText,
                                    subgenres: score.Subgenres,
                                    level: score.Level,
                                    overall_score: score.Overall.Score,
                                    overall_summary: score.Overall.Explanation,
                                    creativity_score: score.Creativity.Score,
                                    creativity_summary: score.Creativity.Explanation,
                                    grammar_score: score.Grammar.Score,
                                    grammar_summary: score.Grammar.Explanation,
                                    coherency_score: score.Coherency.Score,
                                    coherency_summary: score.Coherency.Explanation,
                                    novelty_score: score.Novelty.Score,
                                    novelty_summary: score.Novelty.Explanation,
                                    structure_score: score.Structure.Score,
                                    structure_summary: score.Structure.Explanation,
                                })
                                .then((doc) => {
                                    updateDoc(docRef, {
                                        published: true,
                                        publishedID: doc._key.path.segments[1]
                                    })
                                    getDoc(docRef)
                                        .then((docSnapshot) => {
                                            if (docSnapshot.exists) {
                                                const data = docSnapshot.data();
                                                // Access document fields here
                                                setPublished(data.published)
                                                setPubLoading(false)

                                            } else {
                                                // Document not found
                                                console.log("No such document!");
                                                setPubLoading(false)
                                            }
                                            getDoc(docRef)
                                                .then((docSnapshot) => {
                                                    if (docSnapshot.exists) {
                                                        const data = docSnapshot.data();
                                                        // Access document fields here
                                                        setPublished(data.published)
                                                        setPubLoading(false)

                                                    } else {
                                                        // Document not found
                                                        console.log("No such document!");
                                                        setPubLoading(false)
                                                    }
                                        })
                                        .catch((error) => {
                                            setPubLoading(false)
                                            console.error("Error getting document:", error);
                                    });
                                        })
                                        .catch((error) => {
                                            setPubLoading(false)
                                            console.error("Error getting document:", error);
                                    });
                                })
                            } catch(error) {
                                console.log(text)
                                console.log(error)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                    } else {
                        // Document not found
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
            });
    }

    //unpublish notebook
    function unPublishNotebook() { 
        getDoc(docRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        const data = docSnapshot.data();
                        // Access document fields here
                        deleteDoc(doc(db, "published", data.publishedID))
                        updateDoc(docRef, {
                            published: false,
                            publishedID: null
                        })
                        getDoc(docRef)
                            .then((docSnapshot) => {
                                if (docSnapshot.exists) {
                                    const data = docSnapshot.data();
                                    // Access document fields here
                                    setPublished(data.published)

                                } else {
                                    // Document not found
                                    console.log("No such document!");
                                }
                            })
                            .catch((error) => {
                                console.error("Error getting document:", error);
                        });               
                    } else {
                        // Document not found
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
            });
    }

    //update notebook
    function updateNotebook() {
        getDoc(docRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        const data = docSnapshot.data();
                        // Access document fields here
                        const model = genAI.getGenerativeModel({
                            model: "gemini-1.5-pro",
                            systemInstruction: "Provide a genre classification based on the content provided in "
                            + "input. Try and provide 1 to 2 main genres, and up to 5 sub genres. Score the text "
                            + "based on its creativity, grammatical correctness, coherency, novelty, and structure. "
                            + "Give all scores at an equal frequency."
                            + "\nDon't use \\\" anywhere.\nDo this using this JSON schema:\n{\"Genre\": "
                            + "str,\n\"Subgenres\": str,\n\"Level\": str ( choose from Secondary, post-secondary, "
                            + "graduate, professional),\n\"Creativity\": {\"Score\": int (out of 20, most stories "
                            + "should get below a 14),\"Explanation\": str}\n\"Grammar\": {\"Score\": int (out of "
                            + "20, most stories should get below a 14),\"Explanation\": str}\n\"Coherency\": {\"Score\": "
                            + "int (out of 20, most stories should get below a 14),\"Explanation\": str}\n\"Novelty\": "
                            + "{\"Score\": int (out of 20, most stories should get below a 14),\"Explanation\": str}\n"
                            + "\"Structure\": {\"Score\": int (out of 20, most stories should get below a 14),\"Explanation\": "
                            + "str}\n\"Overall\": {\"Score\": int (out of 100, most stories should below a 70),\""
                            + "Explanation\": str}\n}\n\nMake sure Overall score's score category "
                            + "is equal to the total of Creativity's score, Grammar's score, Coherency's score, "
                            + "Novelty's score and Structure's score. Provide no additional output."
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
                            let score = {
                                "Genre": "undefined",
                                "Subgenres": "undefined",
                                "Level": "Secondary",
                                "Creativity_score": 10,
                                "Creativity_explanation": "Hmm... lets try that again",
                                "Coherency_score": 10,
                                "Coherency_explanation": "Hmm... lets try that again",
                                "Grammar_score": 10,
                                "Grammar_explanation": "Hmm... lets try that again",
                                "Novelty_score": 10,
                                "Novelty_explanation": "Hmm... lets try that again",
                                "Structure_score": 10,
                                "Structure_explanation": "Hmm... lets try that again",
                                "Overall_score": 10,
                                "Overall_explanation": "Hmm... lets try that again",
                            }   
                            try{
                                if( text.slice(0,7) == "```json"){
                                    score = JSON.parse(text.substring(8, text.length - 3))
                                } else {
                                    score = JSON.parse(text)
                                    // Access document fields here
                                }
                                // Access document fields here
                                updateDoc(doc(db, "published", data.publishedID), {
                                    title: data.name,
                                    text: data.text,
                                    author: name,
                                    updated: serverTimestamp(),
                                    genres: score.Genre,
                                    subgenres: score.Subgenres,
                                    preview: userText,
                                    level: score.Level,
                                    overall_score: score.Overall.Score,
                                    overall_summary: score.Overall.Explanation,
                                    creativity_score: score.Creativity.Score,
                                    creativity_summary: score.Creativity.Explanation,
                                    grammar_score: score.Grammar.Score,
                                    grammar_summary: score.Grammar.Explanation,
                                    coherency_score: score.Coherency.Score,
                                    coherency_summary: score.Coherency.Explanation,
                                    novelty_score: score.Novelty.Score,
                                    novelty_summary: score.Novelty.Explanation,
                                    structure_score: score.Structure.Score,
                                    structure_summary: score.Structure.Explanation,
                                })
                            } catch(error) {
                                console.log(text)
                                console.log(error)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                        updateDoc(doc(db, "published", data.publishedID), {
                            title: data.name,
                            text: data.text,
                            updated: serverTimestamp(),
                        });
                    } else {
                        // Document not found
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
            });
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
                text: q.getContents().ops,
                preview: q.getText()
            })
        })
    }, [])
    //view
    return (
        <div>
            <div className="suggestion">{suggest}</div>
            <button className='comment-button hoverable' onClick={commentGeneration}>Generate Comments</button>
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
            <div className='sug-input' >{<>&#8594;</>} to add to text</div>
            {(published === false && pubLoading === false) &&
                <div className='publish hoverable' onClick={publishNotebook}>Publish</div>
            }
            {(published === false && pubLoading === true) &&
                <div className='publish'>Publishing</div>
            }
            {(published === true && pubLoading === false) &&
                <div>
                    <div className='publish hoverable' onClick={unPublishNotebook}>Unpublish</div>
                    <div className='update hoverable' onClick={updateNotebook}>Update</div>
                </div>
            }
            {(published === true && pubLoading === true) &&
                <div>
                    <div className='publish hoverable' onClick={unPublishNotebook}>Unpublish</div>
                    <div className='update hoverable' onClick={updateNotebook}>Update</div>
                </div>
            }
            <div className="container" ref={wrapperRef}></div>
        </div>
    );
}
//imports
import react, { useRef } from 'react';
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import axios from 'axios'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import $ from 'jquery'; 
var Delta = Quill.import('delta');


//get url params to access user and notebook data
const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');
const docRef = doc(db, "users", user, "notebooks", nb);

//gemini setup
const apiKey = "AIzaSyB7dxK35XJ8ssFVczqyu_QtptHTzA1YgtQ";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are skilled and highly creative post-modern author who is working on a new "
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
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
];


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
    
    //suggestion generation
    const [suggest, setSuggestText] = useState(null);
    const [userText, setUserText] = useState(false);
    const [insert, setInsert] = useState(false);

    useEffect(() => {
        //text set
        if( userText == null || userText.length < 5){
            setSuggestText("At your service!")
        } else {
            //call and display proompt result
            const delayDebounceFn = setTimeout(() => {

                //gemini config
                const result = model.generateContent(userText,
                    generationConfig,
                    safetySettings
                )
                .then((response) => {
                    console.log(userText)
                    console.log(response)
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
            navigator.clipboard.writeText(suggest)
            setInsert(false)
        }
    }, [insert])

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
        
        console.log("Finished in callback")
    }, [])
    //view
    return (
        <div>
            <div className="suggestion">{suggest}</div>
            <div className='comment-box'></div>
            <div className='sug-input' >cmd-v to add to text</div>
            <div className="container" ref={wrapperRef}></div>
        </div>

    );
}
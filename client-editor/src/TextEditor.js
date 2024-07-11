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
const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are skilled and highly creative post-modern author who is working on a new "
                + "project. You want to add two to six sentences at a time to your current project. " 
                + "You take careful note of what has previously been input to inform your additions "
                + "to the story. You do not introduce new characters, but you do try to advance the "
                + "plot. You only use what has already been provided as input to determine the "
                + "characters, but you can introduce new settings. You suggest new additions to "
                + "the story as if they were direct continuations of input without retyping what you've already wrote.",
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
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]


//authors view - writing (quill) + suggestion effect
export default function TextEditor() {
    
    //suggestion generation
    const [suggest, setSuggestText] = useState(null);
    const [userText, setUserText] = useState(false);

    const editor = document.createElement("div")
    const q = new Quill(editor, {
        theme: "snow",
        modules: {
            toolbar: TOOLBAR
        }
    })

    useEffect(() => {
        //text set
        if( userText.length < 5){
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
                    setSuggestText(response.response.candidates[0].content.parts[0].text)
                })
                .catch((error) => {
                    setSuggestText("hmm... lets try that again")
                    console.log(error)
                })
            }, 2000);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [userText])

    
    $('.sug-input').on('click', () => {
        q.setText(userText + suggest)
    })


    //quill editor mount
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return

        //quill attach to wrapper
        wrapper.innerHTML = ''
        wrapper.append(editor)

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
            <button className='sug-input'>+</button>
            <div className="container" ref={wrapperRef}></div>
        </div>

    );
}
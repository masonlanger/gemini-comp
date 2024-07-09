//imports
import react, { useRef } from 'react';
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import axios from 'axios'
var Delta = Quill.import('delta');

//get url params to access user and notebook data
const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');
const docRef = doc(db, "users", user, "notebooks", nb);


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
    const [userText, setUserText] = useState(true);



    useEffect(() => {
        if( userText.length < 5){
            setSuggestText("At your service!")
        } else {
            //call and display proompt result
            const delayDebounceFn = setTimeout(() => {
                const url = 'http://localhost:8081/';
                axios.get(url)
                .then(function (response) {
                    setSuggestText(response.data.suggestion);
                }).catch( function (error) {
                    console.log(error)
                });
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [userText])

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
                toolbar: TOOLBAR
            },
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
            <div className="container" ref={wrapperRef}></div>
        </div>

    );
}
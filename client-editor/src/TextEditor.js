import react from 'react';
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore'


const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');
const docRef = doc(db, "users", user, "notebooks", nb);


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

export default function TextEditor() {
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return
        
        wrapper.innerHTML = ''
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar: TOOLBAR
            },
        })

        getDoc(docRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    // Access document fields here
                    console.log("Document data:", data);
                    q.setContents(data.text)
                } else {
                    // Document not found
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
        });


        q.on("text-change", () => {
            updateDoc(docRef, {
                text: q.getContents().ops
            })
        })

    }, [])
    return (
    <div>
        <div> user = { user }, notebook = { nb } </div>
        <div className="container" ref={wrapperRef}></div>
    </div>
    );
}
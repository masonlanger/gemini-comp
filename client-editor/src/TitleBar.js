import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.bubble.css"

const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');
const docRef = doc(db, "users", user, "notebooks", nb);



export default function TitleBar() {
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return
        
        wrapper.innerHTML = ''
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor)

        getDoc(docRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    // Access document fields here
                    q.setText(data.name)
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
                name: q.getText()
            })
        })
    }, [])
    return (
    <div>
        <div className="titlebar" ref={wrapperRef}></div>
    </div>
    );
}
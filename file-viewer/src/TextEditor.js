//imports
import react, { useRef } from 'react';
import { useCallback } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { db } from './firebaseConfig';
import { doc, getDoc} from 'firebase/firestore'


//get url params to access user and notebook data
const searchParams = new URLSearchParams(window.location.search);
const pub = searchParams.get('p');
const docRef = doc(db, "published", pub);


//view published piece
export default function TextEditor() {
    //quill editor mount
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return

        //quill attach to wrapper
        wrapper.innerHTML = ''
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
            readOnly: true,
            theme: "bubble",
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
    }, [])
    //view
    return (
        <div>
            <div className="container" ref={wrapperRef}></div>
        </div>
    );
}
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.bubble.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

const searchParams = new URLSearchParams(window.location.search);
const pub = searchParams.get('p');
const user = searchParams.get('u');
const docRef = doc(db, "published", pub);



export default function TitleBar() {
    const [title, setTitle] = useState("untitled")
    const [author, setAuthor] = useState("anonymous")

    useEffect(() =>{
        getDoc(docRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    // Access document fields here
                    setTitle(data.title)
                    setAuthor(data.author)
                    document.title = title
                } else {
                    // Document not found
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
        });
    })
    return (
        <div>
            <FontAwesomeIcon className="save" icon={faBookmark} size="lg" onClick={() => {
                updateDoc(docRef, {
                    saves: increment(1)
                });
            }}/>
            <div className="titlebar">
                <div className='title'>{title}</div>
                <div className='author'>By: {author}</div>
            </div>
        </div>
    );
}
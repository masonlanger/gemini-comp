import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.bubble.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

library.add(faBookmark)
const searchParams = new URLSearchParams(window.location.search);
const pub = searchParams.get('p');
const user = searchParams.get('u');
const docRef = doc(db, "published", pub);
const userRef = doc(db, "users", user)



export default function TitleBar() {
    const [title, setTitle] = useState("untitled")
    const [author, setAuthor] = useState("anonymous")
    const [saved, setSaved] = useState(false)

    useEffect(() => {
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

    useEffect(() => {
        getDoc(userRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    // Access document fields here
                    if(data.saved.includes(pub)){
                        setSaved(true)
                    }
                } else {
                    // Document not found
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
        });
    },[saved])

    return (
        <div>
            {!saved ?
                <div class="save" onClick={() => {
                    setSaved(true)
                    updateDoc(docRef, {
                        saves: increment(1)
                    });
                    updateDoc(userRef, {
                        saved: arrayUnion(pub)
                    })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512">
                        <path fill="#036eff" d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z"/>
                    </svg>
                </div>
            :
                <div class="save" onClick={() => {
                    setSaved(false)
                    updateDoc(docRef, {
                        saves: increment(-1)
                    });
                    updateDoc(userRef, {
                        saved: arrayRemove(pub)
                    })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512">
                        <path fill="#036eff" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
                    </svg>
                </div>
            }
            <div className="titlebar">
                <div className='title'>{title}</div>
                <div className='author'>By: {author}</div>
            </div>
        </div>
    );
}
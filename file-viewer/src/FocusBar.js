import { useEffect, useState, useCallback } from 'react';
import { db } from './firebaseConfig';
import { doc, getDoc, getDocs, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');
const docRef = doc(db, "users", user)
const inspos = []
try {
    const querySnapshot = await getDocs(collection(db, "users", user, "inspos"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        inspos.push(doc.data())
    });
} catch {
    inspos.push(null)
}
  


export default function FocusBar() {
    const [focuses, setFocuses] = useState([]);
    const [notebookFocuses, setNotebookFocuses] = useState([]);
    const [notebookInspos, setNotebookInspos] = useState([]);
    const [getData, setGetData] = useState(true);


    useEffect(() => {
        if( getData == true){
            //get focuses
            getDoc(docRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        const data = docSnapshot.data();
                        // Access document fields here
                        setFocuses(data.userFocuses)
                    } else {
                        // Document not found
                        console.log("No such document!");
                        setFocuses([null])
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
            });

            getDoc(doc(db, "users", user, "notebooks", nb))
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        const data = docSnapshot.data();
                        // Access document fields here
                        if( data.focuses == null){
                            setNotebookFocuses(["undefined xzy"])
                        } else {
                            setNotebookFocuses(data.focuses)
                        }
                        if( data.inspos == null){
                            setNotebookInspos([{'title': "undefined xzy"}])
                        } else {
                            setNotebookInspos(data.inspos)
                        }
                        
                    } else {
                        // Document not found
                        console.log("No such document!");
                        setNotebookFocuses([null])
                        setNotebookInspos([null])
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
            });
            setGetData(false)
        }
    },[getData]);

    return(
        <div className='focus-list'>
            {focuses.map((focus, idx) =>
                notebookFocuses.includes(focus) ?
                    <div className='focus-item-on' key={idx} onClick={() => {
                            setGetData(true)
                            updateDoc(doc(db, "users", user, "notebooks", nb), {
                                focuses: arrayRemove(focus)
                            });
                        }}>{focus}
                    </div>
                :
                    <div className='focus-item' key={idx} onClick={() => {
                            setGetData(true)
                            updateDoc(doc(db, "users", user, "notebooks", nb), {
                                focuses: arrayUnion(focus)
                            });
                        }}>{focus}
                    </div>    
            )}
            <div className='divider' />
            {inspos.map((inspo, idx) => 
                notebookInspos.some(e => e.title === inspo.title) ?
                    <div className='focus-item-on' key={idx} onClick={() => {
                            setGetData(true)
                            updateDoc(doc(db, "users", user, "notebooks", nb), {
                                inspos: arrayRemove(inspo)
                            });
                        }}>{inspo.title}
                    </div>
                :
                    <div className='focus-item' key={idx} onClick={() => {
                            setGetData(true)
                            updateDoc(doc(db, "users", user, "notebooks", nb), {
                                inspos: arrayUnion(inspo)
                            });
                        }}>{inspo.title}
                    </div>

            )}
        </div>
    );
}
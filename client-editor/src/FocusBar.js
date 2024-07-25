import { useEffect, useState, useCallback } from 'react';
import { db } from './firebaseConfig';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'

const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');
const docRef = doc(db, "users", user)
const colRef = collection(db, "users", user, "inspos")
const querySnapshot = await getDocs(collection(db, "users", user, "inspos"));
const inspos = []
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    inspos.push(doc.data())
  });
console.log(inspos)
  


export default function FocusBar() {
    const [focuses, setFocuses] = useState([]);


    useEffect(() => {
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
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
        });
    });

    return(
        <div className='focus-list'>
            {focuses.map((focus, idx) => 
                <div className='focus-item' key={idx}>
                <label>
                   <input type="checkbox" value="1" onClick={() => console.log(focus)}/><span>{focus}</span>
                </label>
             </div>
            )}
            <div className='divider' />
            {inspos.map((inspo, idx) => 
                <div className='focus-item' key={idx}>
                <label>
                   <input type="checkbox" value="1" onClick={() => console.log(inspo)}/><span>{inspo.title}</span>
                </label>
             </div>
            )}
        </div>
    );
}
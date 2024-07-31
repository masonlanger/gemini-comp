import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig.js';

export async function searchPublicUser(username) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    return getDocs(q);
}
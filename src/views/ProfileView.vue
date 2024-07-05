<template>
    <div> {{ userData.email }}</div>
</template>

<script setup>
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';


const currUid = getAuth().currentUser.uid;
const docRef = doc(db, "users", currUid);
const userInfo = await getDoc(docRef);
const userData = userInfo.data();

</script>
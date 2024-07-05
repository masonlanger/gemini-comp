<template>
    <div class="home"> 
        <TitleWidget title="Profile" />
        <h4 class="prof-username">{{ userData.username.length > 0 ? userData.username : "Set your display name"}}</h4>
        <div>
            <h4>Email: {{ userData.email }}</h4>
            <h4>Activity: Joined in {{ userData.registeredDate.toDate().toLocaleString('default', { month: 'long', year: 'numeric' }) }}, last seen {{userData.lastLogin.toDate().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}}</h4>
        </div>
    </div>
</template>

<script setup>
import TitleWidget from '@/components/TitleWidget.vue';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';


const currUid = getAuth().currentUser.uid;
const docRef = doc(db, "users", currUid);
const userInfo = await getDoc(docRef);
const userData = userInfo.data();

</script>
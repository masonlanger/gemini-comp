<template>
    <div class="home"> 
        <TitleWidget title="Profile" />
        <div class="w-1/2">
            <h4 class="prof-username text-gray-800">{{ userData.username.length > 0 ? userData.username : "Set your display name"}}</h4>
            <form v-if="taglineEmpty" @submit.prevent="submitTagline"><input class="prof-tagline w-full text-gray-800" type="text" placeholder="Add a placeholder" :value='tagline' @input="tagline = $event.target.value" /></form>
            <form v-else @submit.prevent="submitTagline"><input class="prof-tagline w-full text-gray-800" type="text" :value='tagline' @input="tagline = $event.target.value" /></form>
        </div>
        <div class="w-1/2 flex flex-row mt-1">
            <div v-if="userFocusesLength > 0" class="flex flex-row">
                <div v-for="focus in userData.userFocuses" :key="focus" class="prof-focus mr-1">
                    {{ focus }}
                </div>
            </div>
            <div class="prof-add">Add focus</div>
        </div>
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
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';


const currUid = getAuth().currentUser.uid;
const docRef = doc(db, "users", currUid);
const userData = await getDoc(docRef).then(doc => doc.data());
const tagline = userData.tagline != null && userData.tagline.length > 0 ? ref(userData.tagline) : ref('');
const taglineEmpty = tagline.value.length == 0;
const userFocusesLength = userData.userFocuses.length;

const submitTagline = () => {
    const docRef = doc(db, "users", currUid);
    updateDoc(docRef, {
        tagline: tagline.value
    });
}

</script>
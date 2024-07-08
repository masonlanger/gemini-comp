<template>
    <div class="home"> 
        <TitleWidget title="Profile" />
        <div class="row w-full items-center">
            <input type="file" ref="file" style="display: none" accept="image/jpeg, image/png" @change="uploadUserImg" @input="userImg = $event.target.value"/>
            <div v-if="img" @click="$refs.file.click()">
                <img :src="img" class="prof-img" />
            </div>
            <div v-else @click="$refs.file.click()" class="prof-img flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="fa-3x text-gray-500" />
            </div>
            <div>
                <div class="w-full">
                    <div class="flex flex-row items-center space-x-2">
                        <h4 class="prof-username text-gray-800">{{ userData.username.length > 0 ? userData.username : "Set your display name"}}</h4>
                        <div v-if="userData.userType" class="pill">{{ userData.userType }}</div>
                    </div>
                    <form v-if="taglineEmpty" @submit.prevent="submitTagline"><input class="prof-tagline w-full text-gray-800" type="text" placeholder="Add a placeholder" :value='tagline' @input="tagline = $event.target.value" /></form>
                    <form v-else @submit.prevent="submitTagline"><input class="prof-tagline w-full text-gray-800" type="text" :value='tagline' @input="tagline = $event.target.value" /></form>
                </div>
                <div class="w-full flex flex-row mt-1">
                    <div v-if="userFocusesLength > 0" class="flex flex-row">
                        <div v-for="focus in userData.userFocuses" :key="focus" @click="removeFocus(focus)" class="prof-focus-removable mr-1">
                            {{ focus[0].toUpperCase() + focus.slice(1)}}
                        </div>
                    </div>
                    <div v-if="!showFocusOptions" class="prof-add" @click="toggleFocusOptions">Add focus</div>
                    <div v-else class="prof-add" @click="toggleFocusOptions">Hide options</div>
                </div>
                <div v-if="showFocusOptions" class="w-full mt-2">
                    <div class="flex flex-row">
                        <div v-for="focus in focusOptions" :key="focus">
                            <div v-if="!userData.userFocuses.includes(focus)" @click="addFocus(focus)" class="prof-focus-add mr-1">
                                {{ focus[0].toUpperCase() + focus.slice(1)}}
                            </div>
                            <div v-else class="prof-focus-included mr-1">
                                {{ focus[0].toUpperCase() + focus.slice(1)}}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Email: {{ userData.email }}</h4>
                    <h4>Activity: Joined in {{ userData.registeredDate.toDate().toLocaleString('default', { month: 'long', year: 'numeric' }) }}, last seen {{userData.lastLogin.toDate().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}}</h4>
                </div>
            </div>
        </div>
        <div class="mt-3 w-full">
            <SubtitleIconWidget subtitle="Featured Works" icon="thumbtack" />
            <FeaturedWorks />
        </div>
    </div>
    
</template>

<script setup>
import TitleWidget from '@/components/TitleWidget.vue';
import SubtitleIconWidget from '@/components/SubtitleIconWidget.vue';
import FeaturedWorks from '@/components/FeaturedWorks.vue';
import { getAuth } from 'firebase/auth';
import { db, storage } from '@/firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';

const getUserImg = () => {
    const imageRef = storageRef(storage, `users/${currUid}/profile.jpg`);
    return getDownloadURL(imageRef).then((url) => {
        console.log(url);
        return url;
    });
}


const currUid = getAuth().currentUser.uid;
const docRef = doc(db, "users", currUid);
const userData = await getDoc(docRef).then(doc => doc.data());
const img = userData.userImg != null && userData.userImg.length > 0 ? await getUserImg() : null;
const tagline = userData.tagline != null && userData.tagline.length > 0 ? ref(userData.tagline) : ref('');
const taglineEmpty = tagline.value.length == 0;
const userFocusesLength = userData.userFocuses.length;
const focusOptions = await getDoc(doc(db, "assets", "focus-options")).then(doc => doc.data().options);

const submitTagline = () => {
    const docRef = doc(db, "users", currUid);
    updateDoc(docRef, {
        tagline: tagline.value
    });
}

const showFocusOptions = ref(false);
const toggleFocusOptions = () => {
    console.log("Clicked");
    showFocusOptions.value = !showFocusOptions.value;
}

const addFocus = (focus) => {
    if (userData.userFocuses.includes(focus)) return;
    userData.userFocuses.push(focus);
    const docRef = doc(db, "users", currUid);
    updateDoc(docRef, {
        userFocuses: userData.userFocuses
    });
}

const removeFocus = (focus) => {
    if (!userData.userFocuses.includes(focus)) return;
    userData.userFocuses = userData.userFocuses.filter(f => f != focus);
    const docRef = doc(db, "users", currUid);
    updateDoc(docRef, {
        userFocuses: userData.userFocuses.filter(f => f != focus)
    });
}

const uploadUserImg = (event) => {
    const userImg = ref('');
    const file = event.target.files[0];
    const imageRef = storageRef(storage, `users/${currUid}/profile.jpg`);
    uploadBytes(imageRef, file).then((snapshot) => {
        userImg.value = URL.createObjectURL(file);
        const docRef = doc(db, "users", currUid);
        updateDoc(docRef, {
            userImg: userImg.value
        });
    });
}

</script>
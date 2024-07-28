<template>
    <div class="home"> 
        <div class="row w-full items-center bg-gray-50 py-4 px-6 rounded shadow">
            <input type="file" ref="file" style="display: none" accept="image/jpeg, image/png" @change="uploadUserImg" @input="userImg = $event.target.value"/>
            <div v-if="img" @click="$refs.file.click()">
                <img :src="img" class="prof-img" />
            </div>
            <div v-else @click="$refs.file.click()" class="prof-img flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="fa-3x text-gray-500" />
            </div>
            <div class="ml-6 w-full">
                <div>
                    <div class="flex flex-row items-center space-x-2 w-full justify-between">
                        <div class="flex flex-row space-x-2">
                            <h4 class="prof-username text-gray-800">{{ userData.firstName+" "+userData.lastName}}</h4>
                            <div v-if="userData.userType" class="pill">{{ userData.userType }}</div>
                        </div>
                        <font-awesome-icon class="fa-lg hoverable ml-8" :icon="['fas', 'pencil']" @click="openHeaderModal"/>
                    </div>
                    <div>
                        <h4 class="prof-tagline text-gray-600 w-fit">{{ userData.tagline }}</h4>
                    </div>
                </div>
                <div class="w-full flex flex-row mt-1">
                    <div v-if="userFocusesLength > 0" class="flex flex-row">
                        <div v-for="focus in userInfo.userFocuses" :key="focus" class="prof-focus-add mr-1">
                            {{ focus[0].toUpperCase() + focus.slice(1)}}
                        </div>
                    </div>
                </div>
                <!--Contact information-->
                <div v-if="userData.showContact" class="my-1 w-fit">
                    <h3 class="font-bold text-sky-700 hoverable">Contact info</h3>
                </div>
                <div v-if="userData.showActivity">
                    <h4>Activity: Joined in {{ userData.registeredDate.toDate().toLocaleString('default', { month: 'long', year: 'numeric' }) }}, last seen {{userData.lastLogin.toDate().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}}</h4>
                </div>
                <div class="mt-2 row space-x-2">
                    <a v-if="userData.links.linkedin" :href="userData.links.linkedin" target="_blank">
                        <img :src="linkedinIcon" alt="LinkedIn" class="linkedin-icon hoverable" />
                    </a>
                    <a v-if="userData.links.wattpad" :href="userData.links.wattpad" target="_blank">
                        <img :src="wattpadIcon" alt="Wattpad" class="link-icon hoverable" />
                    </a>
                    <a v-if="userData.links.substack" :href="userData.links.substack" target="_blank">
                        <img :src="substackIcon" alt="Substack" class="link-icon hoverable" />
                    </a>
                </div>
            </div>
        </div>
        <div class="mt-3 w-full">
            <SubtitleIconWidget subtitle="Featured Works" icon="thumbtack" />
            <FeaturedWorks />
        </div>
    </div>
    <EditHeaderModal :modalVisible=modalVisible :initial=userData @close="modalVisible = false"/>
</template>

<script setup>
import SubtitleIconWidget from '@/components/SubtitleIconWidget.vue';
import FeaturedWorks from '@/components/FeaturedWorks.vue';
import EditHeaderModal from '@/components/EditHeaderModal.vue';
import { getAuth } from 'firebase/auth';
import { db, storage } from '@/firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, watch } from 'vue';

const getUserImg = () => {
    const imageRef = storageRef(storage, `users/${currUid}/profile.jpg`);
    return getDownloadURL(imageRef).then((url) => {
        return url;
    });
}

const linkedinIcon = await getDownloadURL(storageRef(storage, 'media-library/icons/linkedin.png')).then((url) => {
    return url;
});
const wattpadIcon = await getDownloadURL(storageRef(storage, 'media-library/icons/wattpad.png')).then((url) => {
    return url;
});

const substackIcon = await getDownloadURL(storageRef(storage, 'media-library/icons/substack.png')).then((url) => {
    return url;
});

const currUid = getAuth().currentUser.uid;
const docRef = doc(db, "users", currUid);
const userData = await getDoc(docRef).then(doc => doc.data());
const userInfo = ref(userData);
const img = userData.userImg != null && userData.userImg.length > 0 ? await getUserImg() : null;
const tagline = userData.tagline != null && userData.tagline.length > 0 ? ref(userData.tagline) : ref('');
const taglineEmpty = tagline.value.length == 0;
const userFocusesLength = userData.userFocuses.length;
const focusOptions = await getDoc(doc(db, "assets", "focus-options")).then(doc => doc.data().options);
const modalVisible = ref(false);

watch(() => userData, (newVal) => {
    userInfo.value = newVal;
});
const submitTagline = () => {
    const docRef = doc(db, "users", currUid);
    updateDoc(docRef, {
        tagline: tagline.value
    });
}

const showFocusOptions = ref(false);
const toggleFocusOptions = () => {
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
    uploadBytes(imageRef, file).then(() => {
        userImg.value = URL.createObjectURL(file);
        const docRef = doc(db, "users", currUid);
        updateDoc(docRef, {
            userImg: userImg.value
        });
    });
}

function openHeaderModal(){
    modalVisible.value = true;
}


</script>
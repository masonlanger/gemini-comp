<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchPublicUser } from '@/publicUserSearch';
import { getAuth } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebaseConfig';
import SubtitleIconWidget from '@/components/SubtitleIconWidget.vue';
import ContactInfoModal from '@/components/ContactInfoModal.vue';
import PublishedStoryContainer from '@/components/PublishedStoryContainer.vue';
import FollowerFollowingModal from '@/components/FollowerFollowingModal.vue';

const route = useRoute()
document.title = route.params.username + " - Fellow"
const userInfo = ref(null);
const img = ref(null);
const user = getClickedAuthor(route.params.username).then((users) => {
        users.forEach((user) => { 
            userInfo.value = user.data(); 
            const imageRef = storageRef(storage, `users/${user.id}/profile.jpg`);
            getDownloadURL(imageRef).then((url) => {
                img.value = url;
                return url;
            });
            return user.data()
        });
});

const following = ref(false);
const currUserInfo = ref(null);
const currUid = getAuth().currentUser.uid;
const docRef = doc(db, "users", currUid);
const currUser = await getDoc(docRef).then(doc => {
    currUserInfo.value = doc.data()
    if(currUserInfo.value.following){
        following.value = currUserInfo.value.following.includes(userInfo.value.username);
    }
    return doc.data();
});

watch(
  () => route.params.username,
  () => {
    // close all modals
    contactInfoModalVisible.value = false;
    followerFollowingModalVisible.value = false;

    // change values depending on the new user
    document.title = route.params.username + " - Fellow"
    img.value = null;
    getClickedAuthor(route.params.username).then((users) => {
        users.forEach((user) => { 
            userInfo.value = user.data();
            const imageRef = storageRef(storage, `users/${user.id}/profile.jpg`);
            getDownloadURL(imageRef).then((url) => {
                img.value = url;
                return url;
            });
            return user.data()
        });
    });

    getDoc(docRef).then(doc => {
    currUserInfo.value = doc.data()
    if(currUserInfo.value.following){
        following.value = currUserInfo.value.following.includes(userInfo.value.username);
    }
    return doc.data();
});
  }
)

async function getClickedAuthor(author){
    try {
        return await searchPublicUser(author);
    } catch (error) {
        console.error(error);
    }
}

function getUserImg(uid) {
    const imageRef = storageRef(storage, `users/${uid}/profile.jpg`);
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

const contactInfoModalVisible = ref(false);

function openContactInfoModal(){
    contactInfoModalVisible.value = true;
}

const followerFollowingModalVisible = ref(false);
const follower = ref(true);
function openFollowerFollowingModal(isFollower){
    if(isFollower){
        follower.value = true;
    } else {
        follower.value = false;
    }
    followerFollowingModalVisible.value = true;
}

function follow(){
    if(currUserInfo.value.following == null){
        currUserInfo.value.following = [];
    }
    getClickedAuthor(route.params.username).then((users) => {
        users.forEach((user) => { 
            const authorRef = doc(db, "users", user.id);
            let tempFollowers = [];
            if(user.data().followers == null){
                tempFollowers = [];
            } else {
                tempFollowers = user.data().followers;
            }
            tempFollowers.push(currUserInfo.value.username);
            updateDoc(authorRef, {
                followers: tempFollowers
                });
            })
    });
    currUserInfo.value.following.push(userInfo.value.username);
    const docRef = doc(db, "users", currUid);
    updateDoc(docRef, {
        following: currUserInfo.value.following
    });
    following.value = true;
}

function unfollow(){
    if(currUserInfo.value.following == null){
        return;
    }
    // first, remove the current user from the author's followers list
    getClickedAuthor(route.params.username).then((users) => {
        users.forEach((user) => { 
            const authorRef = doc(db, "users", user.id);
            let tempFollowers = [];
            if(user.data().followers == null){
                return;
            } else {
                tempFollowers = user.data().followers;
            }
            tempFollowers = tempFollowers.filter((follower) => follower != currUserInfo.value.username);
            updateDoc(authorRef, {
                followers: tempFollowers
                });
            })
    });
    currUserInfo.value.following = currUserInfo.value.following.filter((user) => user != userInfo.value.username);
    const docRef = doc(db, "users", currUid);
    updateDoc(docRef, {
        following: currUserInfo.value.following
    });
    following.value = false;
}

</script>
<template>
    <div class="home"> 
        <div class="row w-full items-center bg-gray-50 py-4 px-6 rounded shadow">
            <div v-if="img">
                <img :src="img" class="prof-img" />
            </div>
            <div v-else class="prof-img flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="fa-3x text-gray-500" />
            </div>
            <div class="ml-6 w-full">
                <div>
                    <div class="flex flex-row items-center space-x-2 w-full justify-between">
                        <div class="flex flex-row space-x-2">
                            <h4 class="prof-username text-gray-800">{{ userInfo.firstName+" "+userInfo.lastName}}</h4>
                            <div v-if="userInfo.userType" class="pill">{{ userInfo.userType }}</div>
                        </div>
                    </div>
                    <div>
                        <h4 class="prof-tagline text-gray-600 w-fit">{{ userInfo.tagline }}</h4>
                    </div>
                </div>
                <div class="w-full flex flex-row mt-1">
                    <div v-for="focus in userInfo.userFocuses" :key="focus" class="prof-focus-add mr-1">
                        {{ focus[0].toUpperCase() + focus.slice(1)}}
                    </div>
                </div>
                <!--Contact information-->
                <div v-if="userInfo.showContact" class="my-1 w-fit">
                    <h3 class="font-bold text-sky-700 hoverable" @click="openContactInfoModal">Contact info</h3>
                </div>
                <div v-if="userInfo.showActivity">
                    <h4>Activity: Joined in {{ userInfo.registeredDate.toDate().toLocaleString('default', { month: 'long', year: 'numeric' }) }}, last seen {{userInfo.lastLogin.toDate().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}}</h4>
                </div>
                <div class="mt-2 row space-x-2">
                    <a v-if="userInfo && userInfo.links && userInfo.links.linkedin" :href="userInfo.links.linkedin" target="_blank">
                        <img :src="linkedinIcon" alt="LinkedIn" class="linkedin-icon hoverable" />
                    </a>
                    <a v-if="userInfo && userInfo.links && userInfo.links.wattpad" :href="userInfo.links.wattpad" target="_blank">
                        <img :src="wattpadIcon" alt="Wattpad" class="link-icon hoverable" />
                    </a>
                    <a v-if="userInfo && userInfo.links && userInfo.links.substack" :href="userInfo.links.substack" target="_blank">
                        <img :src="substackIcon" alt="Substack" class="link-icon hoverable" />
                    </a>
                </div>
                <div class="row space-x-6 items-center">
                    <div v-if="currUserInfo.username != userInfo.username && !following" class="follow-btn bg-sky-600 hoverable" @click="follow">Follow</div>
                    <div v-else-if="currUserInfo.username != userInfo.username" class="follow-btn bg-gray-400 text-gray-800 hoverable" @click="unfollow">Following</div>
                    <div class="row space-x-5">
                        <div v-if="userInfo.followers != null && userInfo.followers.length > 1" class="text-sky-700 hoverable font-semibold" @click="openFollowerFollowingModal(true)">{{ userInfo.followers.length }} followers</div>
                        <div v-else-if="userInfo.followers != null && userInfo.followers.length == 1" class="text-sky-700 hoverable font-semibold" @click="openFollowerFollowingModal(true)">{{ userInfo.followers.length }} follower</div>

                        <div v-if="userInfo.following != null && userInfo.following.length > 0" class="text-sky-700 hoverable font-semibold" @click="openFollowerFollowingModal(false)">{{ userInfo.following.length }} following</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-3 w-full">
            <PublishedStoryContainer :sort="'updated'" :user=route.params.username />
        </div>
        <div class="mt-3 w-full">
            <SubtitleIconWidget subtitle="Featured Works" icon="thumbtack" />
            <FeaturedWorks />
        </div>
    </div>
    <ContactInfoModal v-if="userInfo.showContact" :modalVisible=contactInfoModalVisible :firstName=userInfo.firstName :lastName=userInfo.lastName @close="contactInfoModalVisible = false" :userData=userInfo />
    <FollowerFollowingModal v-if="(userInfo.followers && userInfo.followers.length > 0) || (userInfo.following && userInfo.following.length > 0)" :modalVisible=followerFollowingModalVisible @close="followerFollowingModalVisible = false" :userData=userInfo :followers=follower />
</template>
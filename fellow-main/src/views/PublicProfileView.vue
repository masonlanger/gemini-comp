<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchPublicUser } from '@/publicUserSearch';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';

const route = useRoute()
const userInfo = ref(null);
const user = getClickedAuthor(route.params.username).then((users) => {
        users.forEach((user) => { 
            userInfo.value = user.data();
            return user.data()
        });
});

// watch(
//   () => route.params.username,
//   (new, old) => {
//     console.log(new);
//   }
// )

async function getClickedAuthor(author){
    try {
        return await searchPublicUser(author);
    } catch (error) {
        console.error(error);
    }
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

</script>
<template>
    <div class="home"> 
        <div class="row w-full items-center bg-gray-50 py-4 px-6 rounded shadow">
            <div v-if="userInfo.userImg">
                <img :src="userInfo.userImg" class="prof-img" />
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
                    <div v-if="userFocusesLength > 0" class="flex flex-row">
                        <div v-for="focus in userInfo.userFocuses" :key="focus" class="prof-focus-add mr-1">
                            {{ focus[0].toUpperCase() + focus.slice(1)}}
                        </div>
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
            </div>
        </div>
        <div class="mt-3 w-full">
            <SubtitleIconWidget subtitle="Featured Works" icon="thumbtack" />
            <FeaturedWorks />
        </div>
    </div>
    <ContactInfoModal v-if="userInfo.showContact" :modalVisible=contactInfoModalVisible :firstName=userInfo.firstName :lastName=userInfo.lastName @close="contactInfoModalVisible = false" :userData=userInfo />
</template>
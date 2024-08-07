<script setup>
import { ref, defineProps } from 'vue';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import { searchPublicUser } from '@/publicUserSearch';
import { RouterLink, useRouter } from 'vue-router';
const props = defineProps({
    user: {
        type: String,
        required: true
    },
})
const router = useRouter();
const img = ref(null);

async function getUser(user){
    return await searchPublicUser(user);
}

getUser(props.user).then((users) => {
    users.forEach((user) => {
        const imageRef = storageRef(storage, `users/${user.id}/profile.jpg`);
        getDownloadURL(imageRef).then((url) => {
            img.value = url;
            return url;
        });
        return user.data();
    });
});

function redirectToProfile(){
    router.push('/writers/'+props.user);
}
</script>
<template>
    <div class="row items-center">
        <div @click="redirectToProfile">
            <img v-if="img" :src="img" class="w-8 h-8 rounded-full mr-2 hoverable" alt="profile picture">
            <div v-else class="w-8 h-8 rounded-full mr-2 bg-gray-300 hoverable">
                <font-awesome-icon icon="user" class="text-gray-500 p-2" />
            </div>
        </div>
        <p class="font-normal">{{ props.user }}</p>
    </div>
</template>
<script setup>
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import { deleteDoc, collection, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const currUid = getAuth().currentUser.uid;
const props = defineProps({
    notebook: {
        type: Object,
        required: true
    }
})
const router = useRouter();

function deleteNotebook() {
    deleteDoc(doc(db, "users", currUid, "notebooks", props.notebook.id));
}

function onThumbnailClick() {
    router.push(`/notebook/${props.notebook.id}`);
}

</script>

<template>
    <div class="notebook-thumbnail">
        <font-awesome-icon class="fa-1x trash-icon hover-appear" :icon="['fas', 'trash']" @click="deleteNotebook"/>
        <div class="notebook-thumbnail--flex" @click="onThumbnailClick">
            <div class="flex items-center space-x-1 text-gray-700">
                <font-awesome-icon class="fa-1x" :icon="['fas', 'book-open']" />
                <br/>
                <h2 class="notebook-thumbnail--title">{{ notebook.name }}</h2>
            </div>
        </div>
    </div>
</template>
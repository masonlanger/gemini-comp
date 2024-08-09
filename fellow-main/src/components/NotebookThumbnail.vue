<script setup>
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import { deleteDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const currUid = getAuth().currentUser.uid;
const props = defineProps({
    notebook: {
        type: Object,
        required: true
    },
    edittable: {
        type: Boolean,
        default: false,
        required: true
    },
    zIndex: {
        type: Number,
        default: 1,
        required: true
    
    }
})

let preview =  props.notebook.preview
if(preview.length > 500){
    preview = preview.substring(0,540)
}

let saves = null
let views = null
if(props.notebook.published == true){
    const docRef = doc(db, "published", props.notebook.publishedID);
    await getDoc(docRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                const data = docSnapshot.data();
                // Access document fields here
                saves = data.saves;
                views = data.views;
            } else {
                // Document not found
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
    });
}

const router = useRouter();
const showDropdown = ref(false);
function toggleShowDropdown(){
    showDropdown.value = !showDropdown.value;
}
function deleteNotebook() {
    deleteDoc(doc(db, "users", currUid, "notebooks", props.notebook.id));
    showDropdown.value = false;
}

function onThumbnailClick() {
    if(!props.edittable) return;
    window.open('http://localhost:3000/?u=' + currUid + '&nb=' + props.notebook.id, "_blank");
}

const showFeedback = ref(false);
function onLinkClick() {
    showFeedback.value = !showFeedback.value;
}

</script>

<template>
    <div class="notebook-thumbnail rounded-lg" :style="{ 'z-index': zIndex }">
        <div class="dropdown relative">
            <div class="flow-root">
                <font-awesome-icon v-if="notebook.published==true" class="float-left m-2 text-gray-700" :icon="['fas', 'earth-americas']" />
                <font-awesome-icon v-if=props.edittable class="float-right m-2 trash-icon text-gray-700" :icon="['fas', 'ellipsis-vertical']" @click="toggleShowDropdown"/>
            </div>
            <div v-if="showDropdown" class="dropdown-content flex flex-col space-y-2 rounded">
                <div class="flex flex-row items-center dropdown-option" @click="deleteNotebook">
                    <font-awesome-icon class="fa-1x mr-2" :icon="['fas', 'trash']"/>
                    <p>Delete Notebook</p>
                </div>
                <div class="flex flex-row items-center dropdown-option">
                    <font-awesome-icon class="fa-1x mr-2" :icon="['fas', 'user-group']"/>
                    <p>Share</p>
                </div>
                <div class="flex flex-row items-center dropdown-option">
                    <font-awesome-icon class="fa-1x mr-2" :icon="['fas', 'paper-plane']"/>
                    <p>Publish</p>
                </div>
            </div>
        </div>
        <div class="notebook-thumbnail--flex" @click="onThumbnailClick">
            <div class="items-center space-x-1 text-gray-700">
                <div class="story-preview">{{ preview }}</div>
                <h2 v-if="notebook.name.length < 25" class="notebook-thumbnail--title">{{ notebook.name }}</h2>
                <h2 v-else class="notebook-thumbnail--title">{{ notebook.name.substring(0,22) }}...</h2>
                <div v-if="notebook.published" class="flex justify-center items-center mt-2">
                    <font-awesome-icon class="text-blue-500" :icon="['fas', 'user']" size="xs"/>
                    <div class="text-xs ml-1 mr-1 bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ views }}</div>
                    <font-awesome-icon class="text-blue-500" :icon="['fas', 'bookmark']" size="xs"/>
                    <div class="text-xs ml-1 mr-1 bg-gradient-to-r from-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">{{ saves }}</div>
                </div>
                <div v-if="notebook.published" class="flex justify-center items-center text-xs underline" @click="onLinkClick">View Feedback</div>
            </div>
        </div>
    </div>
</template>
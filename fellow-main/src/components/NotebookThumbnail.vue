<script setup>
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import { deleteDoc, collection, doc } from 'firebase/firestore';
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

</script>

<template>
    <div class="notebook-thumbnail rounded-lg" :style="{ 'z-index': zIndex }">
        <div class="dropdown relative">
            <font-awesome-icon v-if=props.edittable class="fa-1x trash-icon px-1" :icon="['fas', 'ellipsis-vertical']" @click="toggleShowDropdown"/>
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
            </div>
        </div>
    </div>
</template>
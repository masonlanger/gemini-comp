<script setup>
import BasicModal from '@/components/BasicModal.vue'
import {defineProps, ref, watch} from 'vue'
import { getAuth } from 'firebase/auth';
import {doc, updateDoc, getDoc} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
const props = defineProps({
    modalVisible: {
        type: Boolean,
        required: true
    },
    inspo: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "add",
        required: false
    }
})

var title = "Edit Inspiration";
if(props.status == "edit"){
    title = "Edit Inspiration";
}
const currUid = getAuth().currentUser.uid;
const inspoText = ref(props.inspo.text);
const inspoTitle = ref(props.inspo.title);
const inspoAuthor = ref(props.inspo.author);
const inspoGenre = ref(props.inspo.genre);
const editHeader = ref(false);
const changedText = ref(props.inspo.text != inspoText.value);
const genres = await getDoc(doc(db, "assets", "focus-options")).then(doc => doc.data().options);

watch(() => props.inspo, (newVal) => {
    inspoText.value = newVal.text;
    inspoTitle.value = newVal.title;
    inspoAuthor.value = newVal.author;
    inspoGenre.value = newVal.genre;
});

watch(() => inspoText.value, (newVal) => {
    changedText.value = newVal != props.inspo.text;
});

function uploadInspo(){
    const docRef = doc(db, "users", currUid, "inspos", props.inspo.id);
    updateDoc(docRef, {
        text: inspoText.value
    });
    changedText.value = false;
}

function toggleHeaderEdit(){
    console.log("Edit header");
    editHeader.value = !editHeader.value;
}
function updateHeaderInformation(){
    console.log("Updating header information");
    const docRef = doc(db, "users", currUid, "inspos", props.inspo.id);
    updateDoc(docRef, {
        title: inspoTitle.value,
        author: inspoAuthor.value,
        genre: inspoGenre.value
    });
    editHeader.value = false;
}

</script>

<template>
    <BasicModal :isVisible=modalVisible :title=title>
        <template #body>
                <div v-if="!editHeader" class="row">
                    <div class="col">
                        <div class="row items-center space-x-4">
                            <div class="col title">
                                <span>From "{{ inspoTitle }}"</span>
                            </div>
                            <div class="col">
                                <font-awesome-icon class="fa-2x edit hoverable" :icon="['fas', 'pencil']" @click="toggleHeaderEdit"/>
                            </div>  
                        </div>
                        <div class="subtitle">
                            <span>By {{ inspoAuthor }}</span>
                        </div>
                        <div>
                            <span v-if="inspoGenre" class="text-xl">Genre: {{ inspoGenre[0].toUpperCase() + inspoGenre.slice(1) }}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="row">
                    <div class="col">
                        <form @submit.prevent="updateHeaderInformation">
                            <div class="row items-center space-x-4">
                                <div class="col title">
                                    <span>From "<input type="text" :value='inspoTitle' @input="inspoTitle = $event.target.value" class="title inspo-input px-1" />"</span>
                                </div>
                                <div class="col">
                                    <font-awesome-icon class="fa-2x edit text-gray-400 hoverable" :icon="['fas', 'pencil']" @click="toggleHeaderEdit"/>
                                </div>  
                            </div>
                            <div class="subtitle mt-1">
                                <span>By <input type="text" :value='inspoAuthor' @input="inspoAuthor = $event.target.value" class="subtitle inspo-input px-1" /></span>
                            </div>
                            <div>
                                <span class="text-xl">Genre: </span>
                                <select v-model="inspoGenre" class="inspo-input">
                                    <option disabled value="">Please select one</option>
                                    <option v-for="genre in genres" :value="genre" :key="genre">{{ genre[0].toUpperCase() + genre.slice(1) }}</option>
                                </select>
                            </div>
                            <button class="btm save-btn my-1">Save</button>
                        </form>
                    </div>
                </div>
                <form @submit.prevent="uploadInspo">
                    <textarea :value=inspoText @input="inspoText = $event.target.value" class="w-full h-56 bg-gray-900 rounded p-2 mt-4"/>
                    <button v-if="changedText" class="btn save-btn">Save Changes</button>
                    <span v-else class="btn save-btn saved">Saved</span>
                </form>
                <div>
                    <span class="text-xl">Add citation information?</span>
                </div>
        </template>
        <template #footer>

        </template>
    </BasicModal>
</template>
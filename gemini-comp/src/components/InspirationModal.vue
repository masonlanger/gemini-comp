<script setup>
import BasicModal from '@/components/BasicModal.vue'
import {defineProps, ref, watch} from 'vue'
import { getAuth } from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
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

var title = "Add Inspiration";
if(props.status == "edit"){
    title = "Edit Inspiration";
}
const currUid = getAuth().currentUser.uid;
const inspoText = ref(props.inspo.text);
const changedText = ref(props.inspo.text != inspoText.value);
watch(() => props.inspo, (newVal) => {
    inspoText.value = newVal.text;
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

</script>

<template>
    <BasicModal :isVisible=modalVisible :title=title>
        <template #body>
                <div class="title">
                    <span>From "{{ inspo.title }}"</span>    
                </div>
                <div class="subtitle">
                    <span>By {{ inspo.author }}</span>
                </div>
                <form @submit.prevent="uploadInspo">
                    <textarea :value=inspoText @input="inspoText = $event.target.value" class="w-full h-56 bg-gray-900 rounded p-2"/>
                    <button v-if="changedText" class="btn save-btn">Save Changes</button>
                    <span v-else class="btn save-btn saved">Saved</span>
                </form>
        </template>
        <template #footer>

        </template>
    </BasicModal>
</template>
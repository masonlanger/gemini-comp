<script setup>
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import { deleteDoc, collection, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { defineProps, defineEmits } from 'vue';

const currUid = getAuth().currentUser.uid;
const props = defineProps({
    inspo: {
        type: Object,
        required: true
    },
    edittable: {
        type: Boolean,
        default: false,
        required: true
    }
})
const emit = defineEmits(['click']);
const router = useRouter();
function deleteInspo() {
    deleteDoc(doc(db, "users", currUid, "inspos", props.inspo.id));
}

function onThumbnailClick() {
    emit('click', { inspo: props.inspo, status: "edit" });
}

</script>

<template>
    <div class="inspo-thumbnail">
        <font-awesome-icon v-if=props.edittable class="fa-1x trash-icon hover-appear" :icon="['fas', 'trash']" @click="deleteInspo"/>
        <div class="col" @click="onThumbnailClick">
            <div class="fixed-text-container">
                <p class="text-gray-700 text-center" style="font-size: 8pt; font-weight: 300;">{{ inspo.text.split(/\s+/).length > 12 ? inspo.text.split(/\s+/).slice(0, 12).join(" ")+"..." : inspo.text }}</p>
            </div>
            <div class="inspo-thumbnail--flex mt-4">
                <h2 class="notebook-thumbnail--title">{{ inspo.title }}</h2>
                <h2 class="inspo-thumbnail--name">{{ inspo.author }}</h2>
            </div>
        </div>
    </div>
</template>
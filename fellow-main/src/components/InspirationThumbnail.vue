<script setup>
import { getAuth } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import { deleteDoc, collection, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { defineProps, defineEmits, ref } from 'vue';

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
    },
    zIndex: {
        type: Number,
        default: 1,
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

const showDropdown = ref(false);
function toggleShowDropdown(){
    showDropdown.value = !showDropdown.value;
}

</script>

<template>
    <div class="inspo-thumbnail rounded" :style="{'z-index': zIndex}">
        <div class="dropdown relative">
            <font-awesome-icon v-if=props.edittable class="fa-1x trash-icon px-1" :icon="['fas', 'ellipsis-vertical']" @click="toggleShowDropdown"/>
            <div v-if="showDropdown" class="dropdown-content flex flex-col space-y-2 rounded">
                <div class="flex flex-row items-center dropdown-option" @click="deleteInspo">
                    <font-awesome-icon class="fa-1x mr-2" :icon="['fas', 'trash']"/>
                    <p>Delete Inspiration</p>
                </div>
                <div class="flex flex-row items-center dropdown-option">
                    <font-awesome-icon class="fa-1x mr-2" :icon="['fas', 'user-group']"/>
                    <p>Share With Writers</p>
                </div>
                <div class="flex flex-row items-center dropdown-option">
                    <font-awesome-icon class="fa-1x mr-2" :icon="['fas', 'paper-plane']"/>
                    <p>Publish to Public</p>
                </div>
            </div>
        </div>
        <div class="col" @click="onThumbnailClick">
            <div class="fixed-text-container mt-10">
                <p class="text-gray-700 text-center" style="font-size: 8pt; font-weight: 300;">{{ inspo.text.split(/\s+/).length > 12 ? inspo.text.split(/\s+/).slice(0, 12).join(" ")+"..." : inspo.text }}</p>
            </div>
            <div class="inspo-thumbnail--flex mt-4">
                <h2 class="notebook-thumbnail--title">{{ inspo.title }}</h2>
                <h2 class="inspo-thumbnail--name">{{ inspo.author }}</h2>
                <div v-if="inspo.genre" class="inspo-thumbnail--name">{{ inspo.genre[0].toUpperCase() + inspo.genre.slice(1) }}</div>
            </div>
        </div>
    </div>
</template>
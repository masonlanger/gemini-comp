<template>
    <div v-if="isVisible" class="modal overflow-y-auto">
        <button @click="closeModal" class="close-modal">Close</button>
        <div class="modal-content w-3/4">
            <div class="modal-header">
                <h2 v-if=title class="title">{{ title }}</h2>
            </div>
            <div class="modal-body" id="modalBody">
                <slot name="body">
                </slot>
            </div>
            <div class="modal-footer">
                <slot name="footer">
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['close']);
defineProps({
    isVisible: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    }
})

function closeModal() {
    emit('close');
}
</script>
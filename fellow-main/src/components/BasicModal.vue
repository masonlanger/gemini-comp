<template>
    <div v-if="isVisible" class="modal">
        <button @click="closeModal" class="close-modal">Close</button>
        <div class="modal-content w-3/4">
            <div class="modal-header">
                <h2 class="title underline">{{ title }}</h2>
            </div>
            <div class="modal-body">
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
        default: "Default Title",
        required: false
    }
})

function closeModal() {
    console.log("Closing modal")
    emit('close');
}
</script>
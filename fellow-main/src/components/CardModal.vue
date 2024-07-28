<script setup>
import BasicModal from '@/components/BasicModal.vue'
import {defineProps} from 'vue'
defineProps({
    modalVisible: {
        type: Boolean,
        required: true
    },
    size: {
        type: String,
        required: false,
        default: "sm"
    },
    title: {
        type: String,
        required: false
    },
    titleIcon: {
        type: String,
        required: false
    }
})


</script>

<template>
    <BasicModal :isVisible=modalVisible>
        <template #body>
                <div class="row justify-center w-full h-fit">
                    <div v-if='size == "sm"' class="rounded bg-gray-100 w-1/2 h-full text-gray-800 py-2 px-4">
                        <div v-if="title" class="row items-center space-x-4 border-b-2">
                            <h2 class="title">{{ title }}</h2>
                            <font-awesome-icon v-if="titleIcon" class="fa-2x" :icon="['fas', titleIcon]"/>
                        </div>
                        <slot name="cardBody">
                        </slot>
                    </div>
                    <div v-else class="rounded bg-gray-100 w-3/5 h-full text-gray-800 py-2 px-4">
                        <div v-if="title" class="row items-center space-x-4 border-b-2">
                            <h2 class="title">{{ title }}</h2>
                            <font-awesome-icon v-if="titleIcon" class="fa-2x" :icon="['fas', titleIcon]"/>
                        </div>
                        <slot name="cardBody">
                        </slot>
                    </div>
                </div>
        </template>
        <template #footer>
        </template>
    </BasicModal>
</template>
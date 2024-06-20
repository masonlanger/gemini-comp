<script setup>
defineProps({
    callout1: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    callout2: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    callout3: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    useIcons: {
        type: Boolean,
        required: false,
        default: false
    }
})

</script>


<template>
    <div class="row three-col">
        <div class="column">
            <font-awesome-icon class="fa-5x" v-if="useIcons" :icon="['fas', image1]" />
            <img v-else :src="image1" alt="Image 1" />
            <div class="callout">
                <p>{{ callout1 }}</p>
            </div>
        </div>
        <div class="column">
            <font-awesome-icon class="fa-5x" v-if="useIcons" :icon="['fas', image2]" />
            <img v-else :src="image2" alt="Image 2" />
            <div class="callout">
                <p>{{ callout2 }}</p>
            </div>
        </div>
        <div class="column">
            <font-awesome-icon class="fa-5x" v-if="useIcons" :icon="['fas', image3]" />
            <img v-else :src="image3" alt="Image 3" />
            <div class="callout">
                <p>{{ callout3 }}</p>
            </div>
        </div>
    </div>
</template>
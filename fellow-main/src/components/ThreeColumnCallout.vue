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
    desc1: {
        type: String,
        required: false
    },
    callout2: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    desc2: {
        type: String,
        required: false
    },
    callout3: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    desc3: {
        type: String,
        required: false
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
        <div class="column w-1/3">
            <font-awesome-icon class="fa-5x" v-if="useIcons" :icon="['fas', image1]" />
            <img v-else :src="image1" alt="Image 1" />
            <div>
                <p class="three-col--callout spectral-medium">{{ callout1 }}</p>
                <p v-if="desc1" class="three-col--desc">{{ desc1 }}</p>
            </div>
        </div>
        <div class="column w-1/3">
            <font-awesome-icon class="fa-5x" v-if="useIcons" :icon="['fas', image2]" />
            <img v-else :src="image2" alt="Image 2" />
            <div>
                <p class="three-col--callout spectral-medium">{{ callout2 }}</p>
                <p v-if="desc2" class="three-col--desc">{{ desc2 }}</p>
            </div>
        </div>
        <div class="column">
            <font-awesome-icon class="fa-5x" v-if="useIcons" :icon="['fas', image3]" />
            <img v-else :src="image3" alt="Image 3" />
            <div>
                <p class="three-col--callout spectral-medium">{{ callout3 }}</p>
                <p v-if="desc3" class="three-col--desc">{{ desc3 }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
    import CardModal from './CardModal.vue';
    import {defineProps} from 'vue'
    const props = defineProps({modalVisible: {type: Boolean, required: true}, firstName: {type: String, required: true}, lastName: {type: String, required: true}, userData: {type: Object, required: true}});
    const title = props.firstName+" "+props.lastName;
    const phone = props.userData.phone ? props.userData.phone.slice(0, 3)+"-"+props.userData.phone.slice(3, 6)+"-"+props.userData.phone.slice(6) : null;
</script>

<template>
    <CardModal :isVisible=modalVisible size="sm" :title=title >
        <template #cardBody>
            <h3 class="text-lg font-semibold mt-2">Contact Information</h3>
            <div class="col space-y-2 py-2">
                <div v-if="props.userData.email" class="col">
                    <div class="row items-center space-x-2">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                        <h3 class="text-base">Email</h3>
                    </div>
                    <p class="text-gray-600 ml-5">{{ userData.email }}</p>
                </div>
                <div v-if="phone" class="col">
                    <div class="row items-center space-x-2">
                        <font-awesome-icon :icon="['fas', 'phone']" />
                        <h3 class="text-base">Phone</h3>
                    </div>
                    <div class="row space-x-2 ml-5"><span class="text-gray-600">{{ phone }}</span>
                        <span class="text-gray-500">({{ userData.phoneType[0].toUpperCase()+userData.phoneType.slice(1) }})</span>
                    </div>
                </div>
            </div>
        </template>
    </CardModal>
</template>
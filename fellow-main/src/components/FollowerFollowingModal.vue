<script setup>
    import CardModal from './CardModal.vue';
    import { searchPublicUser } from '@/publicUserSearch';
    import {defineProps, ref, watch} from 'vue'
    import FollowerRow from './FollowerRow.vue';
    const props = defineProps({
        modalVisible: {type: Boolean, required: true},
        userData: {type: Object, required: true},
        followers: {type: Boolean, required: true}
    });

    const title = ref(props.followers ? "Followers" : "Following");
    const followersList = ref(props.followers ? props.userData.followers : props.userData.following);
    watch(() => props.followers, (newVal) => {
        title.value = newVal ? "Followers" : "Following";
        followersList.value = newVal ? props.userData.followers : props.userData.following;
    });
</script>

<template>
    <CardModal :isVisible=modalVisible size="sm" :title=title >
        <template #cardBody>
            <div class="col mt-1 space-y-2">
                <FollowerRow :user="follower" v-for="follower in followersList" :key="follower" />
            </div>
        </template>
    </CardModal>
</template>
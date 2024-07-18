<script setup>
import CardModal from '@/components/CardModal.vue';
import {defineProps, defineModel, watch, ref} from 'vue'
import { storage } from '@/firebaseConfig';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getAuth, verifyBeforeUpdateEmail } from 'firebase/auth';

const props = defineProps({
    modalVisible: {
        type: Boolean,
        required: true
    },
    initial: {
        type: Object,
        required: true
    }
})

const linkedinIcon = await getDownloadURL(storageRef(storage, 'media-library/icons/linkedin.png')).then((url) => {
    return url;
});
const wattpadIcon = await getDownloadURL(storageRef(storage, 'media-library/icons/wattpad.png')).then((url) => {
    return url;
});

const substackIcon = await getDownloadURL(storageRef(storage, 'media-library/icons/substack.png')).then((url) => {
    return url;
});

const hasLinkedin = defineModel('hasLinkedin')
const hasWattpad = defineModel('hasWattpad')
const hasSubstack = defineModel('hasSubstack')

const linkedinLink = defineModel('linkedinLink')
const wattpadLink = defineModel('wattpadLink')
const substackLink = defineModel('substackLink')

const email = defineModel('email')
const password = defineModel('password')
const confirmPassword = defineModel('confirmPassword')
const phone = defineModel('phone')

console.log(props.initial);

function submitUpdates(){
    if(email.value != null && email.value.length > 0 && email.value != props.initial.email){
        // TODO: add update email logic here
        console.log("Email updated");

        // verifyBeforeUpdateEmail(getAuth().currentUser, email.value).then(() => {
        //     console.log("Email updated");
        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    if(password.value != null && password.value.length > 0){
        if(password.value === confirmPassword.value){
            console.log("Password updated");
        } else {
            console.log("Password didn't match confirmation");
        }
    }
}

</script>

<template>
    <CardModal :modalVisible=modalVisible size="md" title="User Settings" titleIcon="gear">
        <template #cardBody>
            <form @submit.prevent="submitUpdates">
                <h3>Account Information</h3>
                <div class="col w-1/3">
                    <label for="email">Update Email</label>
                    <input type="email" id="email" v-model="email"/>
                </div>
                <div class="col w-1/3">
                    <div>
                        <label for="password">Change Password</label>
                        <input type="password" id="password" v-model="password"/>
                    </div>
                    <div v-if="password != null && password.length > 0">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" v-model="confirmPassword"/>
                    </div>
                </div>
                <div class="col w-1/3">
                    <label for="phone">Add/Update Phone Number</label>
                    <input type="tel" id="phone" v-model="phone"/>
                </div>
                <h3>Connect Other Accounts</h3>
                <table>
                    <tr>
                        <td><img :src="linkedinIcon" class="linkedin-icon" alt="LinkedIn Icon"/></td>
                        <td><input type="checkbox" v-model="hasLinkedin"/></td>
                        <td>
                            <input v-if="!hasLinkedin" type="text" readonly/>
                            <input v-else type="text" v-model="linkedinLink"/>
                        </td>
                    </tr>
                    <tr>
                        <td><img :src="wattpadIcon" class="link-icon" alt="Wattpad Icon"/></td>
                        <td><input type="checkbox" v-model="hasWattpad"/></td>
                        <td>
                            <input v-if="!hasWattpad" type="text" readonly/>
                            <input v-else type="text" v-model="wattpadLink"/>
                        </td>
                    </tr>
                    <tr>
                        <td><img :src="substackIcon" class="link-icon" alt="Substack Icon"/></td>
                        <td><input type="checkbox" v-model="hasSubstack" /></td>
                        <td>
                            <input v-if="!hasSubstack" type="text" readonly/>
                            <input v-else type="text" v-model="substackLink"/>
                        </td>
                    </tr>
                </table>
                <button>Submit</button>
            </form>
        </template>
    </CardModal>
</template>
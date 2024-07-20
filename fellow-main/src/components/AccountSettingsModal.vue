<script setup>
import CardModal from '@/components/CardModal.vue';
import {defineProps, defineModel, watch, ref} from 'vue'
import { storage, db } from '@/firebaseConfig';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getAuth, verifyBeforeUpdateEmail } from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';

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

console.log(props.initial);
initializeModel();

function initializeModel(){
    email.value = props.initial.email;
    password.value = "";
    confirmPassword.value = "";
    hasLinkedin.value = props.initial.links != null && props.initial.links['linkedin'] != null ? true : false;
    hasWattpad.value = props.initial.links != null && props.initial.links['wattpad'] != null ? true : false;
    hasSubstack.value = props.initial.links != null && props.initial.links['substack'] != null ? true : false;

    linkedinLink.value = checkLinkVal('linkedin') ? props.initial.links.linkedin : "";
    wattpadLink.value = checkLinkVal('wattpad') ? props.initial.links.wattpad : "";
    substackLink.value = checkLinkVal('substack') ? props.initial.links.substack : "";
}

function checkLinkVal(link){
    if(props.initial.links != null){
        if(props.initial.links[link] != null){
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

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

    var newUserData = {};
    newUserData.links = {};

    // if hasLinkedin is checked
    if(hasLinkedin.value){
        // if initial user data came with substack link
        if(checkLinkVal('linkedin')){
            // if linkedin link is different than initial
            if(props.initial.links['linkedin'] != null && props.initial.links['linkedin'] != linkedinLink.value){
                if(newUserData.links == null){
                    newUserData.links = {};
                }
                // update link
                newUserData.links['linkedin'] = linkedinLink.value;
            }
            // do nothing
            else {
                console.log("Linkedin link is the same");
                newUserData.links['linkedin'] = props.initial.links['linkedin'];
            }
        }
        // if initial user data did not come with substack link
        else {
            if(newUserData.links == null){
                newUserData.links = {};
            }
            newUserData.links['linkedin'] = linkedinLink.value;
        }
    }

    // if hasWattpad is checked
    if(hasWattpad.value){
        console.log("Entering wattpad");
        // if initial user data came with substack link
        if(checkLinkVal('wattpad')){
            console.log("Wattpad link already exists");
            // if wattpad link is different than initial
            if(props.initial.links['wattpad'] != null && props.initial.links['wattpad'] != wattpadLink.value){
                if(newUserData.links == null){
                    newUserData.links = {};
                }
                // update link
                newUserData.links['wattpad'] = wattpadLink.value;
            }
            // do nothing
            else {
                console.log("Wattpad link is the same");
                newUserData.links['wattpad'] = props.initial.links['wattpad'];
            }
        }
        // if initial user data did not come with substack link
        else {
            if(newUserData.links == null){
                newUserData.links = {};
            }
            newUserData.links['wattpad'] = wattpadLink.value;
        }
    }

    // if hasSubstack is checked
    if(hasSubstack.value){
        // if initial user data came with substack link
        if(checkLinkVal('substack')){
            console.log("Substack link already exists");
            // if substack link is different than initial
            if(props.initial.links['substack'] != null && props.initial.links['substack'] != substackLink.value){
                if(newUserData.links == null){
                    newUserData.links = {};
                }
                // update link
                newUserData.links['substack'] = substackLink.value;
            }
            // do nothing
            else {
                console.log("Substack link is the same");
                newUserData.links['substack'] = props.initial.links['substack'];
            }
        }
        // if initial user data did not come with substack link
        else {
            if(newUserData.links == null){
                newUserData.links = {};
            }
            newUserData.links['substack'] = substackLink.value;
        }
        console.log("Exitting substack");
    }

    console.log(newUserData);
    const docRef = doc(db, "users", getAuth().currentUser.uid);
    updateDoc(docRef, newUserData).then(() => {
        console.log("User data updated");
    }).catch((error) => {
        console.log(error);
    });
}

</script>

<template>
    <CardModal :modalVisible=modalVisible size="md" title="Account Settings" titleIcon="gear">
        <template #cardBody>
            <form @submit.prevent="submitUpdates">
                <h3 class="text-lg">Account Information</h3>
                <div class="col w-1/3">
                    <label for="email" class="font-bold">Update Email</label>
                    <input type="email" id="email" v-model="email"/>
                </div>
                <div class="col w-1/3">
                    <div>
                        <label for="password" class="font-bold">Change Password</label>
                        <input type="password" id="password" v-model="password"/>
                    </div>
                    <div v-if="password != null && password.length > 0">
                        <label for="confirmPassword" class="font-bold">Confirm Password</label>
                        <input type="password" id="confirmPassword" v-model="confirmPassword"/>
                    </div>
                </div>
                <h3 class="font-bold">Connect Other Accounts</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th class="pl-2">Connected</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tr>
                        <td><img :src="linkedinIcon" class="linkedin-icon" alt="LinkedIn Icon"/></td>
                        <td><input type="checkbox" class="ml-2" v-model="hasLinkedin"/></td>
                        <td>
                            <input v-if="!hasLinkedin" type="text" class="bg-gray-300 rounded" readonly/>
                            <input v-else type="text" class="rounded" placeholder="https://www.linkedin.com/in/" v-model="linkedinLink"/>
                        </td>
                    </tr>
                    <tr>
                        <td><img :src="wattpadIcon" class="link-icon" alt="Wattpad Icon"/></td>
                        <td><input type="checkbox" class="ml-2" v-model="hasWattpad"/></td>
                        <td>
                            <input v-if="!hasWattpad" type="text" class="bg-gray-300 rounded" readonly/>
                            <input v-else type="text" class="rounded" v-model="wattpadLink"/>
                        </td>
                    </tr>
                    <tr>
                        <td><img :src="substackIcon" class="link-icon" alt="Substack Icon"/></td>
                        <td><input type="checkbox" class="ml-2" v-model="hasSubstack" /></td>
                        <td>
                            <input v-if="!hasSubstack" type="text" class="bg-gray-300 rounded" readonly/>
                            <input v-else type="text" class="rounded" v-model="substackLink"/>
                        </td>
                    </tr>
                </table>
                <button>Submit</button>
            </form>
        </template>
    </CardModal>
</template>
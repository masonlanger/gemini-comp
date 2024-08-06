<script setup>
import CardModal from '@/components/CardModal.vue';
import {defineProps, defineModel, defineEmits, ref} from 'vue'
import { storage, db } from '@/firebaseConfig';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getAuth, verifyBeforeUpdateEmail } from 'firebase/auth';
import {doc, updateDoc, getDoc} from 'firebase/firestore';

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

const userFocuses = ref(props.initial.userFocuses);
const focusOptions = await getDoc(doc(db, "assets", "focus-options")).then(doc => doc.data().options);

const hasLinkedin = defineModel('hasLinkedin')
const hasWattpad = defineModel('hasWattpad')
const hasSubstack = defineModel('hasSubstack')

const linkedinLink = defineModel('linkedinLink')
const wattpadLink = defineModel('wattpadLink')
const substackLink = defineModel('substackLink')

const email = defineModel('email')
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
const showActivity = defineModel('showActivity')
const showContact = defineModel('showContact')
const tagline = defineModel('tagline')
const pronouns = defineModel('pronouns')
const customPronouns = defineModel('customPronouns')
const phone = defineModel('phone')
const phoneType = defineModel('phoneType')

const numFocusRow = ref(Math.max(Math.floor((window.innerWidth*(3.0/5)-300)/(6*16)), 1));

initializeModel();

function initializeModel(){
    email.value = props.initial.email != null ? props.initial.email : "";
    firstName.value = props.initial.firstName != null ? props.initial.firstName : "";
    lastName.value = props.initial.lastName != null ? props.initial.lastName : "";
    showActivity.value = props.initial.showActivity != null ? props.initial.showActivity : false;
    showContact.value = props.initial.showContact != null ? props.initial.showContact : false;
    pronouns.value = props.initial.pronouns != null ? props.initial.pronouns : "";
    customPronouns.value = props.initial.customPronouns != null ? props.initial.customPronouns : "";
    phone.value = props.initial.phone != null ? props.initial.phone : "";
    phoneType.value = props.initial.phoneType != null ? props.initial.phoneType : "";
    tagline.value = props.initial.tagline != null ? props.initial.tagline : "";

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

const addFocus = (focus) => {
    if (userFocuses.value.includes(focus)) return;
    userFocuses.value.push(focus);
    const docRef = doc(db, "users", getAuth().currentUser.uid);
    updateDoc(docRef, {
        userFocuses: userFocuses.value
    });
    console.log(userFocuses.value);
}

const removeFocus = (focus) => {
    if (!userFocuses.value.includes(focus)) return;
    userFocuses.value = userFocuses.value.filter(f => f != focus);
    const docRef = doc(db, "users", getAuth().currentUser.uid);
    updateDoc(docRef, {
        userFocuses: userFocuses.value.filter(f => f != focus)
    });
}

function submitUpdates(){
    var newUserData = {};
    newUserData.links = {};

    if(firstName.value && props.initial.firstName != firstName.value){
        newUserData.firstName = firstName.value;
    }
    if(lastName.value && props.initial.lastName != lastName.value){
        newUserData.lastName = lastName.value;
    }
    if(pronouns.value && props.initial.pronouns != pronouns.value){
        newUserData.pronouns = pronouns.value;
    }
    if(customPronouns.value && props.initial.customPronouns != customPronouns.value){
        newUserData.customPronouns = customPronouns.value;
    }
    if(tagline.value && props.initial.tagline != tagline.value){
        newUserData.tagline = tagline.value;
    }
    if(showActivity != null && props.initial.showActivity != showActivity.value){
        newUserData.showActivity = showActivity.value;
    }
    if(showContact != null && props.initial.showContact != showContact.value){
        newUserData.showContact = showContact.value;
    }
    if(phone.value && props.initial.phone != phone.value){
        newUserData.phone = phone.value;
    }
    if(phoneType.value && props.initial.phoneType != phoneType.value){
        newUserData.phoneType = phoneType.value;
    }
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
                if(!/https:\/\//.test(linkedinLink.value)){
                    linkedinLink.value = "https://"+linkedinLink.value;
                }
                newUserData.links['linkedin'] = linkedinLink.value;
            }
            // do nothing
            else {
                if(!/https:\/\//.test(linkedinLink.value)){
                    newUserData.links['linkedin'] = "https://"+props.initial.links['linkedin'];
                }
                else {
                    newUserData.links['linkedin'] = props.initial.links['linkedin'];
                }
            }
        }
        // if initial user data did not come with substack link
        else {
            if(newUserData.links == null){
                newUserData.links = {};
            }
            if(!/https:\/\//.test(linkedinLink.value)){
                linkedinLink.value = "https://"+linkedinLink.value;
            }
            newUserData.links['linkedin'] = linkedinLink.value;
        }
    }

    // if hasWattpad is checked
    if(hasWattpad.value){
        // if initial user data came with substack link
        if(checkLinkVal('wattpad')){
            // if wattpad link is different than initial
            if(props.initial.links['wattpad'] != null && props.initial.links['wattpad'] != wattpadLink.value){
                if(newUserData.links == null){
                    newUserData.links = {};
                }
                // update link
                if(!/https:\/\//.test(wattpadLink.value)){
                    wattpadLink.value = "https://"+wattpadLink.value;
                }
                newUserData.links['wattpad'] = wattpadLink.value;
            }
            // do nothing
            else {
                if(!/https:\/\//.test(props.initial.links['wattpad'])){
                    newUserData.links['wattpad'] = "https://"+props.initial.links['wattpad']
                } else {
                    newUserData.links['wattpad'] = props.initial.links['wattpad'];
                }
            }
        }
        // if initial user data did not come with wattpad link
        else {
            if(newUserData.links == null){
                newUserData.links = {};
            }
            if(!/https:\/\//.test(wattpadLink.value)){
                wattpadLink.value = "https://"+wattpadLink.value;
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
                if(!/https:\/\//.test(substackLink.value)){
                    substackLink.value = "https://"+substackLink.value;
                }
                newUserData.links['substack'] = substackLink.value;
            }
            // do nothing
            else {
                if(!/https:\/\//.test(props.initial.links['substack'])){
                    newUserData.links['substack'] = "https://"+props.initial.links['substack'];
                }
                else {
                    newUserData.links['substack'] = props.initial.links['substack'];
                }
            }
        }
        // if initial user data did not come with substack link
        else {
            if(newUserData.links == null){
                newUserData.links = {};
            }
            if(!/https:\/\//.test(substackLink.value)){
                substackLink.value = "https://"+substackLink.value;
            }
            newUserData.links['substack'] = substackLink.value;
        }
    }

    const docRef = doc(db, "users", getAuth().currentUser.uid);
    updateDoc(docRef, newUserData).then(() => {
        window.location.reload();
    }).catch((error) => {
        console.log(error);
    });

}

</script>

<template>
    <CardModal :modalVisible=modalVisible size="md" title="Edit Intro">
        <template #cardBody>
            <form @submit.prevent="submitUpdates">
                <div class="col">
                    <!--Personal Information-->
                    <h3 class="font-bold text-lg">Personal Information</h3>
                    <label for="firstName" class="font-normal mb-1">First Name</label>
                    <input type="text" class="rounded border" v-model="firstName"/>
                    <label for="lastName" class="font-normal mb-1">Last Name</label>
                    <input type="text" class="rounded border" v-model="lastName"/>
                    <label for="pronouns" class="font-normal mb-1">Pronouns</label>
                    <select v-model="pronouns">
                        <option value="">Please select</option>
                        <option value="he/him">He/Him</option>
                        <option value="she/her">She/Her</option>
                        <option value="they/them">They/Them</option>
                        <option value="other">Other</option>
                    </select>
                    <div v-if='pronouns==="other"' class="col mt-1">
                        <label for="customPronouns" class="font-normal mb-1">Enter custom pronouns</label>
                        <input type="text" class="rounded border" v-model="customPronouns"/>
                    </div>
                    <label for=tagline class="font-normal mb-1">Tagline</label>
                    <textarea class="rounded border relative" v-model="tagline" maxlength=100></textarea>
                    <div class="row mt-1">
                        <label for="showActivity" class="font-semibold mb-1">Show activity on profile?</label>
                        <input type="checkbox" class="ml-2" v-model="showActivity"/>
                    </div>
                    <div class="col mt-1">
                        <h3 class="font-bold">Modify Writing Focuses</h3>
                        <div class="w-full mt-2">
                            <div class="col">
                                <div v-for="n in Math.ceil(focusOptions.length/numFocusRow)" :key="n">
                                    <div v-if="n == 1" class="row space-x-4">
                                        <div v-for="focus in focusOptions.slice(n-1, numFocusRow)" :key="focus" class="prof-focus">
                                            <div v-if="!userFocuses.includes(focus)" @click="addFocus(focus)" class="prof-focus-add mr-1">
                                                {{ focus[0].toUpperCase() + focus.slice(1)}}
                                            </div>
                                            <div v-else class="prof-focus-included mr-1" @click="removeFocus(focus)">
                                                {{ focus[0].toUpperCase() + focus.slice(1)}}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="row mt-1 space-x-4">
                                        <div v-for="focus in focusOptions.slice(numFocusRow*(n-1), focusOptions.length-(numFocusRow*(n-1)) > 0 ? numFocusRow*(n-1)+numFocusRow : focusOptions.length)" :key="focus" class="prof-focus">
                                            <div v-if="!userFocuses.includes(focus)" class="prof-focus-add mr-1" @click="addFocus(focus)">
                                                {{ focus[0].toUpperCase() + focus.slice(1)}}
                                            </div>
                                            <div v-else class="prof-focus-included mr-1" @click="removeFocus(focus)">
                                                {{ focus[0].toUpperCase() + focus.slice(1)}}
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
                <!--Contact info-->
                <div class="col">
                    <h3 class="font-bold text-lg">Contact Information</h3>
                    <div col="row">
                        <label for="showContact" class="font-semibold mb-1">Show contact information on profile?</label>
                        <input type="checkbox" class="ml-2" v-model="showContact"/>
                    </div>
                    <label for="email" class="font-normal mb-1">Email</label>
                    <input type="email" class="rounded border bg-gray-300" v-model="email" readonly/>
                    <label for="phone" class="font-normal mb-1">Phone Number</label>
                    <input type="phone" class="rounded border" v-model="phone"/>
                    <div v-if="phone.length > 0" class="col">
                        <label for="phoneType" class="font-normal mb-1">Phone Type</label>
                        <select v-model="phoneType">
                            <option value="">Please select</option>
                            <option value="home">Home</option>
                            <option value="mobile">Mobile</option>
                            <option value="work">Work</option>
                        </select>
                    </div>
                </div>
                <!--Adding links to profiles from other websites-->
                <h3 class="font-bold text-lg">Add Other Accounts</h3>
                <table>
                    <thead>
                        <tr>
                            <th class="font-normal mb-1">Platform</th>
                            <th class="font-normal mb-1 pl-2">Display on Profile</th>
                            <th class="font-normal mb-1">Profile URL</th>
                        </tr>
                    </thead>
                    <tr>
                        <td><img :src="linkedinIcon" class="linkedin-icon" alt="LinkedIn Icon"/></td>
                        <td><input type="checkbox" class="ml-2" v-model="hasLinkedin"/></td>
                        <td>
                            <input v-if="!hasLinkedin" type="text" class="bg-gray-300 rounded border" readonly/>
                            <input v-else type="text" class="rounded border" v-model="linkedinLink"/>
                        </td>
                    </tr>
                    <tr>
                        <td><img :src="wattpadIcon" class="link-icon" alt="Wattpad Icon"/></td>
                        <td><input type="checkbox" class="ml-2" v-model="hasWattpad"/></td>
                        <td>
                            <input v-if="!hasWattpad" type="text" class="bg-gray-300 rounded border" readonly/>
                            <input v-else type="text" class="rounded border" v-model="wattpadLink"/>
                        </td>
                    </tr>
                    <tr>
                        <td><img :src="substackIcon" class="link-icon" alt="Substack Icon"/></td>
                        <td><input type="checkbox" class="ml-2" v-model="hasSubstack" /></td>
                        <td>
                            <input v-if="!hasSubstack" type="text" class="bg-gray-300 rounded border" readonly/>
                            <input v-else type="text" class="rounded border" v-model="substackLink"/>
                        </td>
                    </tr>
                </table>
                <button>Submit</button>
            </form>
        </template>
    </CardModal>
</template>
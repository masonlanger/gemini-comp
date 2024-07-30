<template>
    <div class="wrapper-center login-view">
        <div class="form w-min">
            <div class="wrapper-start">
                <h3 class="login-view--title">Tell us more about yourself.</h3>
                <h3 class="login-view--subtitle mt-2">What's your name?</h3>
            </div>
            <label class="login--label">First (Preferred) Name</label>
            <input type="text" class="login--input" placeholder="First Name" v-model="firstName">
            <label class="login--label">Last Name</label>
            <input type="text" class="login--input" placeholder="Last Name" v-model="lastName">
            <label class="login--label">Username</label>
            <div class="text-sm font-light text-start mb-1">
                <p>This is the display name other users will see when you publish your work</p>
            </div>
            <input type="text" class="login--input" placeholder="Username" v-model="username">
            <div class="wrapper-start">
                <h3 class="login-view--subtitle mt-2 mb-1">I'm a...</h3>
            </div>
            <div class="row">
                <div class="row">
                    <label for="writer">Writer</label>
                    <input type="radio" id="writer" name="userType" value="writer" v-model="userType">
                </div>
                <div class="row">
                    <label for="publisher">Publisher</label>
                    <input type="radio" id="publisher" name="userType" value="publisher" v-model="userType">
                </div>
            </div>
            <div class="login--btn-container">
                <button class="login--btn" @click="submitSupInfo">Start writing</button>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { defineModel } from 'vue'
  import { getAuth } from 'firebase/auth'
  import { useRouter } from 'vue-router' // import router
  import { doc, updateDoc, getDoc } from "firebase/firestore"; 
  import { db } from '../firebaseConfig'

  const router = useRouter() // get a reference to our vue router
  
  const user = await new Promise((resolve, reject) =>
    getAuth().onAuthStateChanged((user) =>
    resolve(user), (e) => reject(e)));
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if(userDoc.data().completedRegistration){
    router.push('/notebooks');
  }

  const firstName = defineModel('firstName');
  const lastName = defineModel('lastName');
  const username = defineModel('username');
  const userType = defineModel('userType');
  
  initializeModel();



  function initializeModel(){
    firstName.value = "";
    lastName.value = "";
    username.value = "";
    userType.value = "";
  }
  function submitSupInfo(){
    const user = getAuth().currentUser;
    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      userType: userType.value,
      completedRegistration: true
    })
    .then(() => {
      router.push('/notebooks');
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
  </script>
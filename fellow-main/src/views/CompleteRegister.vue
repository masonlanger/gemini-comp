<template>
    <div class="wrapper-center login-view">
        <div class="form">
            <div class="wrapper-start">
                <h3 class="login-view--title">Tell us more about yourself.</h3>
                <h3 class="login-view--subtitle">How will you use Fellow?</h3>
            </div>
            <label class="login--label">I'm a...</label>
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
                <button class="login--btn">Start writing</button>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
  import { useRouter } from 'vue-router' // import router
  import { doc, setDoc, collection } from "firebase/firestore"; 
  import { db } from '../firebaseConfig'
  </script>
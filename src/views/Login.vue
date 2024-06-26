<template>
    <h2 class="subtitle">Log in</h2>
    <div class="form">
        <label class="login--label" for="username">Username</label>
        <input class="login--input" type="text" name="username" placeholder="Username" v-model="email">
        <label class="login--label" for="password">Password</label>
        <input class="login--input" type="password" name="password" placeholder="Password" v-model="password">
        <div v-if="errMsg">{{ errMsg }}</div>
        <div class="login--btn-container">
            <button class="login--btn" @click="login">Email</button>
            <button class="login--btn" @click="regGoogle">Google</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router' // import router

const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE

const router = useRouter() // get a reference to our vue router

const login = () => { // we also renamed this method 
  signInWithEmailAndPassword(getAuth(),email.value, password.value) // THIS LINE CHANGED
    .then((data) => {
      console.log('Successfully logged in!');
      router.push('/lib') // redirect to the feed
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
            errMsg.value = 'Invalid email'
            break
        case 'auth/user-not-found':
            errMsg.value = 'No account with that email was found'
            break
        case 'auth/wrong-password':
            errMsg.value = 'Incorrect password'
            break  
        default:
            errMsg.value = 'Email or password was incorrect'
            break
      }
    });
}
</script>
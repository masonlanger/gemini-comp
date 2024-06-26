<template>
  <h2 class="subtitle">Register</h2>
  <div class="form">
      <label class="login--label" for="username">Username</label>
      <input class="login--input" type="text" name="username" placeholder="Username" v-model="email">
      <label class="login--label" for="password">Password</label>
      <input class="login--input" type="password" name="password" placeholder="Password" v-model="password">
      <div v-if="errMsg">{{ errMsg }}</div>
      <div class="login--btn-container">
          <button class="login--btn" @click="register">Email</button>
          <button class="login--btn" @click="regGoogle">Google</button>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router' // import router

const email = ref('')
const password = ref('')

const router = useRouter() // get a reference to our vue router
const register = () => {
    createUserWithEmailAndPassword(getAuth(),email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log('Successfully registered!');
      router.push('/lib') // redirect to the feed
    })
    .catch(error => {
      console.log(error.code)
      alert(error.message);
    });
}

const regGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log('Successfully registered!');
      router.push('/lib') // redirect to the feed
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message);
    })
};

</script>
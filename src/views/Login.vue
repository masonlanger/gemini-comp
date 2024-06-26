<template>
    <h2 class="subtitle">Log in</h2>
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
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();

const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("success");
        router.push("/lib");
    })
    .catch((error) => {
        console.log(error.code);
        switch (error.code) {
            case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
            case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
            default:
                "Email or password was incorrect";
                break;
        }
    })
}

const regGoogle = () => {

}

</script>
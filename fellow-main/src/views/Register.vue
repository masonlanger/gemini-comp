<template>
  <div class="wrapper-center login-view">
    <div class="form w-min">
      <div class="wrapper-start">
        <h3 class="login-view--title">Think it. Write it.</h3>
        <h3 class="login-view--subtitle">Join the Fellow community</h3>
      </div>
      <button class="gsi-material-button" style="width:16rem; margin-top: 1rem;" @click="regGoogle">
              <div class="gsi-material-button-state"></div>
              <div class="gsi-material-button-content-wrapper">
                <div class="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span class="gsi-material-button-contents">Continue with Google</span>
                <span style="display: none;">Continue with Google</span>
              </div>
        </button>
        <span style="align-self:center; margin-top: 0.5rem;">or</span>
        <label class="login--label" for="email">Email</label>
        <input class="login--input" type="text" name="email" placeholder="Email" v-model="email">
        <label class="login--label" for="password">Password</label>
        <input class="login--input" type="password" name="password" placeholder="Password" v-model="password">
        <div class="text-sm font-light text-start mt-1">
          <p>Please create a password at least 8 characters long, with at least one letter and one digit, no commas, colons, semicolons, apostrophes, or quotation marks.</p>
        </div>
        <label class="login--label" for="conpassword">Confirm Password</label>
        <input class="login--input" type="password" name="conpassword" placeholder="Confirm password" v-model="conpassword">
        <div v-if="errMsg">{{ errMsg }}</div>
        <div class="login--btn-container">
            <button class="login--btn" @click="register">Continue</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router' // import router
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from '../firebaseConfig'

const email = ref('');
const password = ref('');
const conpassword = ref('');
const errMsg = ref(null);

function validatePassword(password){
  if (password.value.length < 6) {
    console.log("too short");
    return false;
  }
  if (/[\\;\\:\\'\\"\\,]/.test(password.value)) {
    console.log("special characters");
    return false;
  }
  if(!/[0-9]/.test(password.value)) {
    console.log("no numbers");
    return false;
  }
  if(!/[a-zA-Z]/.test(password.value)) {
    console.log("no letters");
    return false;
  }
  if (password.value !== conpassword.value) {
    console.log("passwords don't match");
    return false;
  }
  return true;
}

const router = useRouter() // get a reference to our vue router

  const user = await new Promise((resolve, reject) =>
    getAuth().onAuthStateChanged((user) =>
    resolve(user), (e) => reject(e)));
  if(user){
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if(userDoc.data().completedRegistration){
      router.push('/notebooks');
    }
  }

const register = () => {
    if(!validatePassword(password)){
      return;
    }
    createUserWithEmailAndPassword(getAuth(),email.value, password.value) // need .value because ref()
    .then(() => {
      const docRef = doc(db, "users", getAuth().currentUser.uid);
      setDoc(docRef, {
        username: "",
        userType: "",
        email: getAuth().currentUser.email,
        userSettings: {
          theme: "",
          fontSize: "",
          defaultPublishStatus: 0
        },
        userFocuses: [],
        registeredDate: new Date(),
        lastLogin: new Date(),
      });
      
      router.push('/register/complete-register')
    })
    .catch(error => {
      console.log(error.code)
      alert(error.message);
    });
}

const regGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      const docRef = doc(db, "users", getAuth().currentUser.uid);
      setDoc(docRef, {
        username: "",
        userType: "",
        email: getAuth().currentUser.email,
        userSettings: {
          theme: "",
          fontSize: "",
          defaultPublishStatus: 0
        },
        userFocuses: [],
        registeredDate: new Date(),
        lastLogin: new Date(),
      });

      console.log('Successfully registered!');
      router.push('/register/complete-register') // redirect to the feed
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message);
    })
};

</script>
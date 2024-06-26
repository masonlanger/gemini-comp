<script setup>
import { ref, watchEffect } from 'vue' // used for conditional rendering
import { getAuth,onAuthStateChanged, signOut} from 'firebase/auth'
import { useRouter } from 'vue-router'
import NavigationBarItem from './components/NavigationBarItem.vue';

const router = useRouter()

const isLoggedIn = ref(true)

// runs after firebase is initialized
onAuthStateChanged(getAuth(),function(user) {
    if (user) {
      isLoggedIn.value = true // if we have a user
    } else {
      isLoggedIn.value = false // if we do not
    }
})

const handleSignOut = () => {
  signOut(getAuth())
  router.push('/')
}

</script>
<template>
  <main>
    <span v-if="isLoggedIn">
      <nav class="navbar">
        <div class="navbar__items">
          <NavigationBarItem name="Home" route="/" />
          <NavigationBarItem name="Dashboard" route="dashboard" />
          <NavigationBarItem name="Library" route="lib" />
          <NavigationBarItem name="Profile" route="profile" />
          <NavigationBarItem @click="handleSignOut" name="Logout" route="/" />
        </div>
      </nav>
    </span>
    <span v-else>
      <nav class="navbar">
        <div class="navbar__items">
          <NavigationBarItem name="Home" route="/" />
          <NavigationBarItem name="Login" route="login" />
          <NavigationBarItem name="Register" route="register" />
        </div>
      </nav>
    </span>
    <!-- TODO: add router-view logic? for now, keep static view -->
    <RouterView />
    <!-- <HomePage loggedIn="isLoggedIn"/> -->
  </main>
</template>
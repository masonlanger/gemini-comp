<script setup>
import NavigationBarItem from './NavigationBarItem.vue'
import Logo from './Logo.vue'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const isLoggedIn = ref(false)

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
  isLoggedIn.value = false;
  router.push('/')
}
</script>

<template>
    <nav v-if="isLoggedIn" class="navbar">
        <div class="collapse">
            <button @click="toggleNav">
                <font-awesome-icon :icon="faAnglesLeft" />
            </button>
        </div>
        <div class="left-align"><a href="/"><Logo /></a></div>
        <div class="navbar__items">
            <NavigationBarItem name="Library" route="/library" />
            <NavigationBarItem name="Notebooks" route="/notebooks" />
            <NavigationBarItem name="Profile" route="/profile" /> 
            <NavigationBarItem name="Sign Out" :action=handleSignOut route="/" />
        </div>
    </nav>
    <nav v-else class="navbar">
        <div class="collapse">
            <button @click="toggleNav">
                <font-awesome-icon :icon="faAnglesLeft" />
            </button>
        </div>
        <div class="left-align"><a href="/"><Logo /></a></div>
        <div class="navbar__items">
            <NavigationBarItem name="Log In" route="login" />
            <NavigationBarItem name="Sign Up" route="register" />
        </div>
    </nav>
</template>
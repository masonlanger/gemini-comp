<script setup>
import NavigationBarItem from './NavigationBarItem.vue'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

defineProps({
    loggedIn: Boolean
})

function toggleNav() {
    var nav = document.getElementsByClassName("navbar")[0];
    var navitems = document.querySelectorAll(".navbar__items");
    navitems.forEach((item) => {
        item.classList.toggle("isHidden");
    });
    nav.classList.toggle("isHidden");
}

</script>

<template>
    <nav v-if="loggedIn" class="navbar">
        <div class="collapse">
            <button @click="toggleNav">
                <font-awesome-icon :icon="faAnglesLeft" />
            </button>
        </div>
        <div class="navbar__items">
            <NavigationBarItem name="Dashboard" route="dashboard" />
            <NavigationBarItem name="Library" route="lib" />
            <NavigationBarItem name="Profile" route="profile" />
            <NavigationBarItem name="Register" route="register" />
            <NavigationBarItem name="Login" route="login" />
        </div>
    </nav>
    <!-- <nav class="navbar">
        <div class="collapse">
            <button @click="toggleNav">
                <font-awesome-icon :icon="faAnglesLeft" />
            </button>
        </div>
        <div class="navbar__items">
            <NavigationBarItem name="Log In" route="login" />
            <NavigationBarItem name="Sign Up" route="register" />
        </div>
    </nav> -->
</template>
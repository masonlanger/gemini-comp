<script setup>
import NavigationBarItem from './NavigationBarItem.vue'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
function toggleNav() {
    var nav = document.getElementsByClassName("navbar")[0];
    nav.classList.toggle("isHidden");
}

</script>

<template>
    <nav class="navbar">
        <div class="collapse">
            <button @click="toggleNav">
                <font-awesome-icon :icon="faAnglesLeft" />
            </button>
        </div>
        <div class="navbar__items">
            <NavigationBarItem name="Dashboard" route="dashboard" />
            <NavigationBarItem name="Library" route="lib" />
            <NavigationBarItem name="Profile" route="profile" />
        </div>
    </nav>
</template>
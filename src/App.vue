<script setup>
import { ref } from 'vue'
import NavigationBar from './components/NavigationBar.vue'

const isLoggedIn = ref(false);
isLoggedIn.value = false;
</script>

<template>
  <main>
    <NavigationBar loggedIn="isLoggedIn"/>
    <!-- TODO: add router-view logic? for now, keep static view -->
    <RouterView />
    <!-- <HomePage loggedIn="isLoggedIn"/> -->
  </main>
</template>
<script setup>
defineProps({
    loggedIn: Boolean
})
</script>

<template>
    <dialog id="pop-up">
        <h2 class="subtitle">Log In or Sign Up</h2>
        <form>
            <label class="login--label" for="username">Username</label>
            <input class="login--input" type="text" name="username" value="" placeholder="Username">
            <label class="login--label" for="password">Password</label>
            <input class="login--input" type="text" name="password" value="" placeholder="Password">
            <div class="login--btn-container">
                <button class="login--btn">Log in</button>
                <button class="login--btn">Sign up</button>
            </div>
        </form>
</dialog>
</template>
<script setup>
function postNewNotebook() {
     
}
</script>


<template>
    <div class="ann-block" @click=postNewNotebook>
        <font-awesome-icon class="fa-2x" :icon="['fas', 'pencil']" />
        <h1>Add New Notebook</h1>
    </div>
</template>
<script setup>
import EditorView from './views/EditorView.vue';
import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import { db } from '@/firebaseConfig';

const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');

const notebook = useDocument(doc(collection(db, "users", user, "notebooks"), nb))

</script>

<template>
  <div>{{ notebook.name }}</div>
  <div>user={{ user }}</div>
  <div>nb={{ nb }}</div>
  <EditorView :notebook="notebook" />
</template>



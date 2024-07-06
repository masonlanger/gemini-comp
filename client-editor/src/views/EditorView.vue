<template>
    <div> {{ notebook.text }}</div>
    <editor 
      class='container' 
      theme='snow' 
      toolbar='full' 
      @ready="onEditorReady($event)"
      @text-change="saveText($event)"
    />
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useDocument } from 'vuefire'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig';

const searchParams = new URLSearchParams(window.location.search);
const user = searchParams.get('u');
const nb = searchParams.get('nb');

const editor = QuillEditor;

const notebook = useDocument(doc(collection(db, "users", user, "notebooks"), nb));

function onEditorReady (e) {
  e.container.querySelector('.ql-blank').innerHTML = notebook.text;
}

function saveText (e) {
  updateDoc(notebook, {
    text: editor.getHTML()
  })
}
</script>
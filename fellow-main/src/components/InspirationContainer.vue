<script setup>
    import AddNewInspiration from '../components/AddNewInspiration.vue'
    import InspirationThumbnail from '../components/InspirationThumbnail.vue'
    import InspirationModal from '../components/InspirationModal.vue'
    import CardModal from '../components/CardModal.vue'
    import { useCollection } from 'vuefire'
    import { db } from '@/firebaseConfig';
    import { collection, query, orderBy } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    import { ref } from 'vue'

    const currUid = getAuth().currentUser.uid;
    const inspos = useCollection(query(collection(db, "users", currUid, "inspos" ), orderBy("timestamp", "desc")));
    
    const modalVisible = ref(false);
    const inspoData = ref(null);
    const numInsposRow = 5;
    function changeModal(inspo){
        modalVisible.value = true;
        inspoData.value = inspo.inspo;
    }

    function closeModal(){
        modalVisible.value = false;
    }
</script>

<template>
    <div class="flex-col">
        <div class="row space-x-2">
            <AddNewInspiration class="mr-6"/>
                <div v-if="inspos.length > 0">
                    <div v-for="n in Math.ceil(inspos.length/numInsposRow)" :key="n">
                        <div v-if="n == 1" class="row space-x-2"> 
                            <InspirationThumbnail @close="closeModal" @click="changeModal" :zIndex="inspos.length-inspos.indexOf(inspo)+2" :edittable=true v-for="inspo in inspos.slice(n-1, numInsposRow)" :inspo="inspo" :key="inspo.id"/>
                        </div>
                        <div v-else class="row mt-2 space-x-2">
                            <InspirationThumbnail @close="closeModal" @click="changeModal" :zIndex="inspos.length-inspos.indexOf(inspo)+2" :edittable=true v-for="inspo in inspos.slice(numInsposRow*(n-1), inspos.length-(numInsposRow*(n-1)) > 0 ? numInsposRow*(n-1)+numInsposRow : inspos.length)" :inspo="inspo" :key="inspo.id"/>
                        </div>
                    </div>
                </div>
        </div>
        <div class="flex flex-col content-center items-start p-2 text-gray-500" style="font-size: 20pt; font-weight: 250; width: 34rem; height: 100%;">
                    <h3>Having trouble finding some good writing?</h3>
                    <br />
                    <h3>Check out <a href="/" class="text-gray-900" style="font-weight: 500;">our curated list</a> of influential passages from renowned authors to add to your Library</h3>
        </div>
    </div>
    <InspirationModal v-if="inspoData !== null" :modalVisible=modalVisible :inspo=inspoData :status="inspoData?.status" @close="modalVisible = false" />
</template>
<script setup>
import { ref } from 'vue' // used for conditional rendering
import { getAuth,onAuthStateChanged, signOut} from 'firebase/auth'
import { useRouter } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';

</script>
  <template>
    <main>
      <NavigationBar />
    <!-- TODO: add router-view logic? for now, keep static view -->
      <RouterView />
    <!-- <HomePage loggedIn="isLoggedIn"/> -->
  </main>
</template>
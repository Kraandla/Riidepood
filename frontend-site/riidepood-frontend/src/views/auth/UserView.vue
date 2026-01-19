<template>
  <div id="user">
    <div class="container">
      <Suspense>
        <template #default>
          <div v-if="user" class="card card-body mt-4">
            <h5 class="card-title">User details</h5>
            <h6 class="card-subtitle mb-2 text-muted">Email: {{ user.Email }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">First Name: {{ user.FirstName }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Last Name: {{ user.LastName }}</h6>
 
          </div>
        </template>

        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore()

const user = computed(()=>{
  console.log(authStore.userDetail)
  return authStore.userDetail
})

async function getUser(){
  await authStore.getUser()
}

onMounted(async ()=>{
  await getUser()
})

</script>

<style scoped>
#user .card{
  max-width: 40vw;
  margin: auto;
}
</style>
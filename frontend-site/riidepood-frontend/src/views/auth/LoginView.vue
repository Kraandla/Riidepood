<template>
  <div id="login">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="loginData.Email" type="email" class="form-control" id="email" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="loginData.Password" type="password" class="form-control" id="password" required>
          </div>
          
          <!-- Add error message display -->
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          
          <button type="submit" class="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type LoginData } from '../../stores/auth';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive<LoginData>({
  Email: "",
  Password: "",
})

watch(loginData, () => {
  errorMessage.value = ""
})

const errorMessage = ref<string>("")

async function submit(){
  await authStore.login(loginData)
    .then(res => {
      router.replace({name: "user"})
    })
    .catch(err => {
      errorMessage.value = err.message
    })
}

</script>

<style scoped>
#login .card{
  max-width: 40vw;
  margin: auto;
}
</style>
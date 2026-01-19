<template>
  <div id="register">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Register</h5>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>

          <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input v-model="registerData.FirstName" type="text" class="form-control" id="first_name" autocomplete="off" required>
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input v-model="registerData.LastName" type="text" class="form-control" id="last_name" autocomplete="off" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="registerData.Email" type="email" class="form-control" id="email" autocomplete="off" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="registerData.Password" type="password" class="form-control" id="password" required>
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">Confirm Password</label>
            <input v-model="registerData.ConfirmPassword" type="password" class="form-control" id="password_confirm" required>
          </div>
          
 
          <ul v-if="showRequirements" class="requirements">
            <li v-for="(requirement, key) in passwordRequirements" :key="key"
              :class="requirement.predicate ? 'is-success' : 'is-error'">
              {{ requirement.name }}
            </li>
          </ul>
          <button type="submit" class="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type RegisterData } from '../../stores/auth';
import { computed, watch, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const password = ref('');
//const confirmPassword = ref('');
const errorMessage = ref<string>("")

const authStore = useAuthStore()
const router = useRouter()

const registerData = reactive<RegisterData>({
  Email: "",
  FirstName: "",
  LastName: "",
  Password: "",
  ConfirmPassword: "",
})



async function submit() {

  errorMessage.value = ""
  
  // Check if all password requirements are met
  if (!allRequirementsMet.value) {
    errorMessage.value = "Please ensure all password requirements are met."
    return
  }
  
  await authStore.register(registerData)
    .then(res => {
      router.replace({ name: "login" })
    })
    .catch(err => {
      errorMessage.value = err.message
    })
}

const passwordRequirements = computed(() => ([
  {
    name: 'Must contain uppercase letters',
    predicate: registerData.Password.toLowerCase() !== registerData.Password,
  },
  {
    name: 'Must contain lowercase letters',
    predicate: registerData.Password.toUpperCase() !== registerData.Password,
  },
  {
    name: 'Must contain numbers',
    predicate: /\d/.test(registerData.Password),
  },
  {
    name: 'Must contain symbols',
    predicate: /\W/.test(registerData.Password),
  },
  {
    name: 'Must be at least 8 characters long',
    predicate: registerData.Password.length >= 8,
  },
  {
    name: 'Must match',
    predicate: registerData.Password === registerData.ConfirmPassword,
  }
]))

const allRequirementsMet = computed(() =>
  passwordRequirements.value.every(req => req.predicate)
)


const showRequirements = computed(() =>
  (registerData.Password || registerData.ConfirmPassword) && !allRequirementsMet.value
)


const emit = defineEmits([
  'update:password',
  'update:confirmPassword',
  'update:validity'
])

watch(passwordRequirements, () => {
  emit(
    'update:validity',
    passwordRequirements.value.reduce((v, p) => v && p.predicate, true)
  )
})

watch(password, (newVal) => {
  registerData.Password = newVal
})





</script>

<style scoped>


#register .card {
  max-width: 40vw;
  margin: auto;
}

.requirements {
  font-weight: bold;
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
}

.is-success {
  color: #96CA2D;
}

.is-error {
  color: #BA3637;
}
</style>
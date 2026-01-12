
<script setup>
import { computed, ref, watch, reactive } from 'vue'

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const NewUser = reactive({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
})

const passwordRequirements = computed(() => ([
  {
    name: 'Must contain uppercase letters',
    predicate: password.value.toLowerCase() !== password.value,
  },
  {
    name: 'Must contain lowercase letters',
    predicate: password.value.toUpperCase() !== password.value,
  },
  {
    name: 'Must contain numbers',
    predicate: /\d/.test(password.value),
  },
  {
    name: 'Must contain symbols',
    predicate: /\W/.test(password.value),
  },
  {
    name: 'Must be at least 8 characters long',
    predicate: password.value.length >= 8,
  },
  {
    name: 'Must match',
    predicate: password.value === confirmPassword.value,
  }
]))

const allRequirementsMet = computed(() => 
  passwordRequirements.value.every(req => req.predicate)
)

const showRequirements = computed(() => 
  (password.value || confirmPassword.value) && !allRequirementsMet.value
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

// Sync password with NewUser.Password
watch(password, (newVal) => {
  NewUser.Password = newVal
})

async function signUp() {
    console.log("button is clicked")
    await fetch(`http://localhost:8080/users/`, 
    {
        method: 'POST', 
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(NewUser),
    })
}
</script>

<template>
    <h1>Insert Your inforamtion:</h1>
    <form @submit.prevent="signUp">
        <div>
            <label>First Name: </label>
            <input v-model="NewUser.FirstName" type="text" placeholder="First name"/>
        </div>
              <div>
            <label>Last Name: </label>
            <input v-model="NewUser.LastName" type="text" placeholder="Last name"/>
        </div>
        <div>
            <label>Email: </label>
            <input v-model="NewUser.Email" type="email" placeholder="Email"/>
        </div>
        <div>
            <label>Password: </label>
               <input
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      @change="$emit('update:password', $event.target.value)"
      id="password"
    >
        </div>
    
            <div>
            <label>Confirm Password: </label>
              <input
      :type="showPassword ? 'text' : 'password'"
      v-model="confirmPassword"
      @change="$emit('update:confirmPassword', $event.target.value)"
      id="confirmPassword"
    >
        </div>
      <ul v-if="showRequirements" class="requirements">
      <li
        v-for="(requirement, key) in passwordRequirements"
        :key="key"
        :class="requirement.predicate ? 'is-success' : 'is-error'"
      >
        {{ requirement.name }}
      </li>
    </ul>
   
      
        <button type="submit">Register</button>
    </form>
</template>

<style scoped>
.password-input {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-size: 16px;
}

input {
  margin-bottom: 12px;
  padding: 8px;
  font-size: 16px;
}

button {
  margin-bottom: 12px;
}

.requirements {
  font-weight: bold;
}

.is-success {
  color: #96CA2D;
}

.is-error {
  color: #BA3637;
}
</style>
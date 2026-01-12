<script setup>
import { computed, ref, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

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


watch(password, (newVal) => {
    NewUser.Password = newVal
})

async function signUp() {
    errorMessage.value = ''
    const response = await fetch(`http://localhost:8080/users/`,
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(NewUser),
        })
    
    if (response.ok) {
        router.push('/')
    } else if (response.status === 409) {
        errorMessage.value = 'This email is already registered.'
    }
}
</script>

<template>
    <h1>Insert Your inforamtion:</h1>
    <div v-if="errorMessage" class="error-message" style="color: red; margin-bottom: 1rem;">
        {{ errorMessage }}
    </div>
    <form @submit.prevent="signUp">
        <div>
            <label>First Name: </label>
            <input v-model="NewUser.FirstName" type="text" placeholder="First name" required=""/>
        </div>
        <div>
            <label>Last Name: </label>
            <input v-model="NewUser.LastName" type="text" placeholder="Last name" required=""/>
        </div>
        <div>
            <label>Email: </label>
            <input v-model="NewUser.Email" type="email" placeholder="Email" required=""/>
        </div>
        <div>
            <label>Password: </label>
            <input :type="showPassword ? 'text' : 'password'" v-model="password"
                @change="$emit('update:password', $event.target.value)" id="password" required="" placeholder="Password"/>
        </div>

        <div>
            <label>Confirm Password: </label>
            <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword"
                @change="$emit('update:confirmPassword', $event.target.value)" id="confirmPassword" required="" placeholder="Confirm password"/>
        </div>
        <ul v-if="showRequirements" class="requirements">
            <li v-for="(requirement, key) in passwordRequirements" :key="key"
                :class="requirement.predicate ? 'is-success' : 'is-error'">
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
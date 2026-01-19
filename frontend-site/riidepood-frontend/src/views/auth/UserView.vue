<template>
  <div id="user">
    <div class="container">
      <div v-if="user" class="card card-body mt-4">
        <h5 class="card-title">User Profile</h5>
        
        <form v-if="isEditing" @submit.prevent="saveChanges">
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input v-model="editData.FirstName" type="text" class="form-control" id="firstName" required>
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input v-model="editData.LastName" type="text" class="form-control" id="lastName" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="editData.Email" type="email" class="form-control" id="email" required>
          </div>
          
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>
          
          <button type="submit" class="btn btn-success me-2">Save Changes</button>
          <button type="button" @click="cancelEdit" class="btn btn-secondary">Cancel</button>
        </form>
        
        <div v-else>
          <h6 class="card-subtitle mb-2 text-muted">Email: {{ user.Email }}</h6>
          <h6 class="card-subtitle mb-2 text-muted">First Name: {{ user.FirstName }}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Last Name: {{ user.LastName }}</h6>
          <button @click="startEdit" class="btn btn-primary mt-3">Edit Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { computed, onMounted, ref, reactive } from 'vue';

const authStore = useAuthStore()

const user = computed(()=>{
  return authStore.userDetail
})

const isEditing = ref(false)
const errorMessage = ref("")
const successMessage = ref("")

const editData = reactive({
  FirstName: "",
  LastName: "",
  Email: ""
})

function startEdit() {
  editData.FirstName = user.value.FirstName
  editData.LastName = user.value.LastName
  editData.Email = user.value.Email
  isEditing.value = true
  errorMessage.value = ""
  successMessage.value = ""
}

function cancelEdit() {
  isEditing.value = false
  errorMessage.value = ""
  successMessage.value = ""
}

async function saveChanges() {
  try {
    await authStore.updateUser(editData)
    successMessage.value = "Profile updated successfully!"
    isEditing.value = false
    setTimeout(() => {
      successMessage.value = ""
    }, 3000)
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

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
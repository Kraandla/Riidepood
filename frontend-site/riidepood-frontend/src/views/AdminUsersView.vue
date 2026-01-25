<template>
  <div class="admin-users">
    <h1>User Management</h1>
    <p v-if="error" class="error">{{ error }}</p>
    
    <div v-if="loading" class="loading">Loading users...</div>
    
    <div v-else-if="users.length > 0" class="users-table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.UserID">
            <td>{{ user.FirstName }} {{ user.LastName }}</td>
            <td>{{ user.Email }}</td>
            <td>
              <span :class="['status-badge', user.IsAdmin ? 'admin' : 'user']">
                {{ user.IsAdmin ? 'Admin' : 'User' }}
              </span>
            </td>
            <td>
              <button 
                @click="toggleAdminStatus(user)"
                :disabled="processingUserId === user.UserID"
                class="toggle-btn"
              >
                {{ processingUserId === user.UserID ? 'Processing...' : 
                   user.IsAdmin ? 'Remove Admin' : 'Make Admin' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <p v-else>No users found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApiPrivate } from '../composables/useApi'

interface User {
  UserID: string
  FirstName: string
  LastName: string
  Email: string
  IsAdmin: boolean
}

const users = ref<User[]>([])
const loading = ref(true)
const error = ref('')
const processingUserId = ref<string | null>(null)

const fetchUsers = async () => {
  loading.value = true
  error.value = ''
  try {
    const { data } = await useApiPrivate().get('/users')
    users.value = data
  } catch (err: any) {
    if (err.response?.status === 403) {
      error.value = 'You do not have permission to view users. Admin access required.'
    } else {
      error.value = 'Failed to load users. Please try again.'
    }
    console.error('Error fetching users:', err)
  } finally {
    loading.value = false
  }
}

const toggleAdminStatus = async (user: User) => {
  processingUserId.value = user.UserID
  error.value = ''
  try {
    const { data } = await useApiPrivate().put(`/users/${user.UserID}/toggle-admin`)
    // Update the user in the list
    const index = users.value.findIndex(u => u.UserID === user.UserID)
    if (index !== -1) {
      users.value[index] = data
    }
  } catch (err: any) {
    if (err.response?.status === 403) {
      error.value = 'You do not have permission to modify admin status.'
    } else {
      error.value = 'Failed to update admin status. Please try again.'
    }
    console.error('Error toggling admin status:', err)
  } finally {
    processingUserId.value = null
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.admin-users {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.error {
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.users-table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table thead {
  background-color: #f5f5f5;
}

.users-table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
}

.users-table td {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.users-table tbody tr:hover {
  background-color: #fafafa;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.admin {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status-badge.user {
  background-color: #f5f5f5;
  color: #666;
}

.toggle-btn {
  padding: 6px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.toggle-btn:hover:not(:disabled) {
  background-color: #1565c0;
}

.toggle-btn:disabled {
  background-color: #bdbdbd;
  cursor: not-allowed;
}
</style>

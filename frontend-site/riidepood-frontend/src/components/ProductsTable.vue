<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

defineProps<{
    items: Array<any>
}>()

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.isAdmin)
</script>

<template> 
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product name</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in items" :key="item.ProductID">
                <td>{{item.ProductID}}</td>
                <td>
                    <router-link :to="{ name: 'singleProduct', params: { itemID: item.ProductID } }">
                                {{ item.Name }}
                            </router-link>
                </td>
            </tr>
        </tbody>
    </table>
    <button v-if="isAdmin" class="btn btn-primary mt-3">
        <router-link to="/newProduct" class="text-white text-decoration-none">Create new product</router-link>
    </button>
</template>
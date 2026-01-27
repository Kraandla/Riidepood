<script>
import OrderDetailsTable from '../../components/OrderComponents/OrderDetailsTable.vue';
import { useApiPrivate } from '../../composables/useApi'
import { useAuthStore } from '../../stores/auth'

export default {
    components: { OrderDetailsTable },
    data() {
        return {
            thisOrder: {
              
         
                Products: [],
                createdAt: null
            }
        }
    },
    props: {
        seekID: {
            type: String,
            required: true
        }
    },
    computed: {
        isAdmin() {
            const auth = useAuthStore()
            return auth.isAdmin
        },
       formattedDate() {
    if (!this.thisOrder?.createdAt) return ''

    return new Date(this.thisOrder.createdAt).toLocaleDateString('et-EE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}
    },
    async created() {
        try {
            const api = useApiPrivate()
            const resp = await api.get(`/orders/${this.seekID}`)
            this.thisOrder = resp.data
        } catch (error) {
            console.error('Failed to load order:', error)
        }
    },
    methods: {
        async updateOrderStatus(order) {
            try {
                const newStatus = order.Status === 0 ? 1 : 0
                await useApiPrivate().put(`/orders/${order.OrderID}`, { Status: newStatus })
                this.thisOrder.Status = newStatus
                this.$router.push({ name: 'orders' })
            } catch (error) {
                console.error('Failed to update order status:', error)
                alert('Failed to update order status')
            }
        },
    }
}
</script>

<template>
    <div class="container">
        <h3 class="my-2">Order details</h3>
        <p><strong>Order ID:</strong> {{ thisOrder.OrderID }}</p>
        <p><strong>Date:</strong> {{ formattedDate }}</p>
        <p><strong>Status: </strong>
            <span v-if="thisOrder.Status == 1">Confirmed</span>
            <span v-else>Unconfirmed</span>
        </p>

        <OrderDetailsTable :thisOrder="thisOrder" />

        <div class="d-flex mt-3 justify-content-center table-responsive w-100">
            <button v-if="isAdmin && thisOrder.Status === 0" class="btn btn-warning w-25 rounded-top-0 rounded-end-0" type="button" @click="updateOrderStatus(thisOrder)">Confirm</button>
            <button v-else-if="isAdmin && thisOrder.Status === 1" class="btn btn-warning w-25 rounded-top-0 rounded-end-0" type="button" @click="updateOrderStatus(thisOrder)">Unconfirm</button>
            <button class="btn btn-secondary w-25 rounded-top-0 rounded-start-0" type="button" @click="$router.push({ name: 'orders' })">Back</button>
        </div>
    </div>
</template>
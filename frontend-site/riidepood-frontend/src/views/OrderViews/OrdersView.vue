<script> 
    import OrdersTable from '../../components/OrderComponents/OrdersTable.vue'
    import { useApiPrivate } from '../../composables/useApi'
    
    export default {
        components: {
            OrdersTable
        },
        data() {
            return {
                allOrders: []
            }
        },
        async created() {
            try {
                const response = await useApiPrivate().get('/orders');
                this.allOrders = response.data;
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        }
    }
</script>

<template>
    <main>
        <OrdersTable :items="allOrders"/>
    </main>
</template>
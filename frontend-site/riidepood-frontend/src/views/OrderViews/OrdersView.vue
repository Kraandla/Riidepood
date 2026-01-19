<script> 
    import OrdersTable from '../../components/OrderComponents/OrdersTable.vue'
    
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
            this.allOrders = await (await fetch('http://localhost:8080/orders')).json();
        }
    }
</script>

<template>
    <main>
        <OrdersTable :items="allOrders"/>
    </main>
</template>
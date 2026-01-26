<script>
    import OrderDetailsTable from '../../components/OrderComponents/OrderDetailsTable.vue';

    export default {
        components: {
            OrderDetailsTable
        },
        data() {
            return {
                thisOrder: {
                    OrderID: this.seekID,
                    Status: "",
                    Products: []
                }
            }
        },
        props: {
            seekID: {
                type: String,
                required: true
            }
        },
        async created() {
        
        this.thisOrder = await (await fetch(`http://localhost:8080/orders/${this.seekID}`)).json();
    },
    methods: {
            async updateOrderStatus(order){
            const newStatus = order.Status === 0 ? 1 : 0;
            await fetch(`http://localhost:8080/orders/${order.OrderID}`, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({Status: newStatus})
            });
            order.Status = newStatus;
            this.$r
        },
    }
    }
</script>

<template> 
    <OrderDetailsTable :thisOrder="thisOrder"/>
        <div class="d-flex mt-0 justify-content-center table-responsive w-100">
            <button v-if="thisOrder.Status = 0" class="btn btn-warning w-25 rounded-top-0 rounded-end-0" type="button" @click="updateOrderStatus(thisOrder)">Confirm</button>  
            <button v-else class="btn btn-warning w-25 rounded-top-0 rounded-end-0" type="button" @click="updateOrderStatus(thisOrder)">Unconfirm</button>  
            <button class="btn btn-secondary w-25 rounded-top-0 rounded-start-0" type="button" @click="$router.push({ name: 'orders' })">Back</button>  
        </div>
</template>
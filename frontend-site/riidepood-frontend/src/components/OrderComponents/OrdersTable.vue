<script>
    import OrderDeleteButton from './OrderDeleteButton.vue'
    export default {
        name: "OrdersTable",
        components: {
            OrderDeleteButton
        },
        props: {
            items: Array,
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
            },
        }
    }
</script>

<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Order Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.OrderID">
                <td>
                    <router-link :to="{ name: 'singleOrder', params: { itemID: item.OrderID } }">
                                {{item.OrderID}}
                            </router-link>
                </td>
                <td v-if="item.Status == 1">
                    Confirmed
                </td>
                <td v-else>
                    Unconfirmed
                </td>
                <td>
                    <button @click="updateOrderStatus(item)">
                        Confirm/Unconfirm
                    </button>
                </td>
                <td>
                    <order-delete-button :seekID="item.OrderID"/>
                </td>
            </tr>
        </tbody>
    </table>
    <button><router-link :to="{ name: 'newOrder'}">Create new order</router-link></button>
</template>
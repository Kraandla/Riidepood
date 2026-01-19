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
                    <button>
                        <router-link :to="{ name: 'editOrder', params: { itemID: item.OrderID} }">
                                Edit
                            </router-link>
                    </button>
                </td>
                <td>
                    <order-delete-button :seekID="item.OrderID" :items="items" />
                </td>
            </tr>
        </tbody>
    </table>
    <button><router-link :to="{ name: 'newOrder'}">Create new order</router-link></button>
</template>
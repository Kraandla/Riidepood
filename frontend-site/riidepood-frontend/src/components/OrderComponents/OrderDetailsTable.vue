<script>
    export default{
        name: "OrderDetailsTable",
        props: {
            thisOrder: JSON,
        }
    }
</script>

<template>
    <table class="table table-striped">
            <tr>
                <td>Order ID</td>
                <td>{{thisOrder.OrderID}}</td>
            </tr>
            <tr>
                <td>Order Status</td>
                <td>{{thisOrder.Status}}</td>
            </tr>
            <tr>
                <td>Products</td>
                <td v-for="item in thisOrder.Products" :key="item.ProductID">{{item.ProductID}}</td>
            </tr>
    </table>
</template>
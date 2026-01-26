<script>
    export default{
        name: "OrderDetailsTable",
        props: {
            thisOrder: JSON,
        }
    }
</script>

<template>
    <div class="d-flex mt-0 justify-content-center table-responsive w-100">
    <table class="details-table" v-if="thisOrder">
        <tbody>
        <tr>
            <td>Order ID</td>
            <td>{{ thisOrder.OrderID }}</td>
        </tr>

        <tr>
            <td>Order Status</td>
            <td>{{ thisOrder.Status }}</td>
        </tr>

        <tr>
            <td>Order Products</td>
            <td v-if="thisOrder.Products">
            <span
                v-for="item in thisOrder.Products"
                :key="item.ProductID"
            >
                {{ item.ProductID }}
            </span>
            </td>
        </tr>
        </tbody>
    </table>
    </div>

</template>
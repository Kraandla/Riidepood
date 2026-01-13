<script>
    export default{
        name: "ProductDetailsTable",
        props: {
            thisProduct: JSON,
        }
    }
</script>

<template>
    <table class="table table-striped">
            <tr>
                <td>Product ID</td>
                <td>{{thisProduct.ProductID}}</td>
            </tr>
            <tr>
                <td>Product Name</td>
                <td>{{thisProduct.Name}}</td>
            </tr>
            <tr>
                <td>Product Price</td>
                <td>{{thisProduct.Price}}</td>
            </tr>
            <tr>
                <td>Product Image</td>
                <td>{{thisProduct.Image}}</td>
            </tr>
    </table>
</template>
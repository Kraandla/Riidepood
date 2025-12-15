<script> 
    export default {
        name: "ProductsTable",
        props: {
            items:Array
        }
    }

</script>

<template> 
    <table class="table table-striped">
        <tr>
            <th>Product ID</th>
            <th>Product name</th>
        </tr>
        <tr v-for="item in items" :key="item.FilmID">
            <td>{{item.ProductID}}</td>
            <td>{{item.Name}}</td>
        </tr>
    </table>
</template>
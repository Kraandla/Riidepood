<script> 
    export default {
        name: "ProductsTable",
        props: {
            items: Array,
        }
    }

</script>

<template> 
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product name</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in items" :key="item.ProductID">
                <td>{{item.ProductID}}</td>
                <td>
                    <router-link :to="{ name: 'singleProduct', params: { itemID: item.ProductID } }">
                                {{ item.Name }}
                            </router-link>
                </td>
            </tr>
        </tbody>
    </table>
    <button><router-link to="/newProduct">Create new product</router-link></button>
</template>
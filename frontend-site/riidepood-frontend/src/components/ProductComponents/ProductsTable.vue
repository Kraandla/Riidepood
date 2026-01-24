<script>
    import ProductDeleteButton from './ProductDeleteButton.vue'
    import AddToCart from '../AddToCart.vue'
    export default {
        name: "ProductsTable",
        components: {
            ProductDeleteButton,
            AddToCart
        },
        data(){
            return {
            rowCounter: 0
            }
       },
        props: {
            items: Array,
        },
        methods: {
            goToProductDetails(item){
                this.$router.push({ name: 'singleProduct', params: { itemID: item.ProductID } })
            }
        }
    }
</script>

<template> 
    <table class="table table-hover table-dark table-striped w-100">
        <thead>
            <tr class="table-row">
                <th>Nr</th>
                <th>Product ID</th>
                <th>Product name</th>
                <th>Product Price</th>
                <th>Product image</th>
                <th>
                    <div class="flex-row w-100 d-inline-flex justify-content-evenly flex-row">
                    <router-link class="flex-fill btn btn-warning" :to="{ name: 'newProduct'}">Create new product</router-link>
                    </div>
                </th>
            </tr>
        </thead>

        <tbody>
            <tr @click="goToProductDetails(item)" class="table-row" style="cursor: pointer;" v-for="(item, index) in items" :key="item.ProductID">
                <td>{{ index + 1}}</td>
                <td>{{item.ProductID}}</td>
                <td>{{ item.Name }}</td>
                <td>{{ item.Price }} €</td>

                <td v-if="!item.Image">No image</td>
                <td v-else>Has an image</td>

                <td>
                    <div class="flex-row w-100 d-inline-flex flex-row">
                    <router-link class="btn btn-primary col-5 me-auto" :to="{ name: 'editProduct', params: { itemID: item.ProductID} }">
                            Edit
                    </router-link>
                    <product-delete-button :seekID="item.ProductID" :items="items" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
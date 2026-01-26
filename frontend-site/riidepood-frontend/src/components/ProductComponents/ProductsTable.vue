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
            <tr class="table-row" style="cursor: pointer;" v-for="(item, index) in items" :key="item.ProductID">
                <td @click="goToProductDetails(item)">{{ index + 1}}</td>
                <td @click="goToProductDetails(item)">{{item.ProductID}}</td>
                <td @click="goToProductDetails(item)">{{ item.Name }}</td>
                <td @click="goToProductDetails(item)">{{ item.Price }} €</td>

                <td @click="goToProductDetails(item)" v-if="!item.Image">No image</td>
                <td @click="goToProductDetails(item)" v-else>Has an image</td>

                <td>
                    <div class="flex-row w-100 d-inline-flex flex-row">
                    <router-link class="btn btn-primary col-5 me-auto" :to="{ name: 'editProduct', params: { itemID: item.ProductID} }">
                            Edit
                    </router-link>
                    <product-delete-button :seekID="item.ProductID" :items="items" />
                    <!-- <add-to-cart :product-id="item.ProductID"/> -->
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
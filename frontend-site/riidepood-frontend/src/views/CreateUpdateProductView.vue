<script>
    import router from "../router/index"
    export default {
        data() {
            return {
                newProduct: {
                    Name: "dipdip",
                    Price: 15,
                    Image: "dipdip",
                },
                productToBeModified: {
                    ProductID: "",
                    Name: "",
                    Price: 0,
                    Image: ""
                },
                modifiedData: {
                    ProductID: "",
                    Name: "",
                    Price: 0,
                    Image: ""
                }
            };
        },

        props: {
            seekID: {
                type: String,
                default: null,
                required: false
            }
        },

        async created() {
            this.productToBeModified = await (await fetch(`http://localhost:8080/products/${this.seekID}`)).json();
        },

        computed: {
            editMode() {
                return !this.seekID
                }
        },
        methods: {
            async createProduct() {
                await 
                fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.newProduct)
                });
                this.$router.push({ name: 'products' });
            },
            async updateProduct(){
                fetch(`http://localhost:8080/products/${this.seekID}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.modifiedData)
                });
                this.$router.push({ name: 'products' });
            }
        },
    }

</script>

<template>

<div v-if="editMode">
    <h1>Create a New Item</h1>
        <div>Name: <input v-model="newProduct.Name" type="text"> </input></div>
        <div>Price: <input v-model="newProduct.Price" type="number"></input></div>
        <div>Image: <input v-model="newProduct.Image" type="text"></input></div>
        <button @click="createProduct">Create</button>
        <button @click="$router.push({ name: 'products' })">Back</button>
 </div>

 <div v-else>
    <table class="table table-striped">
        <tr>
            <td>Product ID</td>
            <td>{{productToBeModified.ProductID}}</td>
        </tr>
        <tr>
            <td>Product Name</td>
            <td>{{productToBeModified.Name}}</td>
        </tr>
        <tr>
            <td>Product Price</td>
            <td>{{productToBeModified.Price}}</td>
        </tr>
        <tr>
            <td>Product Image</td>
            <td>{{productToBeModified.Image}}</td>
        </tr>
    </table>

    <h1>Update Item</h1>
        <div>Name: <input v-model="modifiedData.Name" type="text"> </input></div>
        <div>Price: <input v-model="modifiedData.Price" type="number"></input></div>
        <div>Image: <input v-model="modifiedData.Image" type="text"></input></div>
        <button @click="updateProduct">Update</button>
        <button @click="$router.push({ name: 'products' })">Back</button>
 </div>
</template>
<script>
    export default{
        name: "ProductInfoInputSection",
        data(){
            return {
                newProductData: {
                    Name: "",
                    Price: 0,
                    Image: "",
                }
            }
        },
        props: {
            seekID: {
                type: String,
                default: null,
                required: false
            }
        },
        computed: {
            editMode() {
                return this.seekID
            }
        },
        methods: {
            async createProduct() {
                await 
                fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.newProductData)
                });
                this.$router.push({ name: 'products' });
            },
            async updateProduct(){
                fetch(`http://localhost:8080/products/${this.seekID}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.newProductData)
                });
                this.$router.push({ name: 'products' });
            }
        },
    }
</script>

<template>
    <div v-if="!editMode">
        <div>Name: <input v-model="newProductData.Name" type="text"> </input></div>
        <div>Price: <input v-model="newProductData.Price" type="number"></input></div>
        <div>Image: <input v-model="newProductData.Image" type="text"></input></div>
        <button @click="createProduct">Create</button>
        <button @click="$router.push({ name: 'products' })">Back</button>
    </div>
    <div v-else="editMode">
        <div>Name: <input v-model="newProductData.Name" type="text"> </input></div>
        <div>Price: <input v-model="newProductData.Price" type="number"></input></div>
        <div>Image: <input v-model="newProductData.Image" type="text"></input></div>
        <button @click="updateProduct">Update</button>
        <button @click="$router.push({ name: 'products' })">Back</button>
    </div>
</template>
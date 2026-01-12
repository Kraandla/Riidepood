<script>
    export default {
        data() {
            return {
                newProduct: {
                    Name: "",
                    Price: 0,
                    Image: "",
                }
            };
        },

        methods: {
            async createProduct() {
                await 
                fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.newProduct)
                });
            }
        },
    }

</script>

<template>
 <div>
    <h1>Create a New Item</h1>
        <div>Name: <input v-model="newProduct.Name" type="text"> </input></div>
        <div>Price: <input v-model="newProduct.Price" type="number"></input></div>
        <div>Image: <input v-model="newProduct.Image" type="text"></input></div>
        <button @click="createProduct, $router.go(-1)">Create</button>
 </div>
</template>
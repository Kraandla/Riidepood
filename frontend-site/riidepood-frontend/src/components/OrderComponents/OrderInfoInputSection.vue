<script>
    export default{
        // NB! The add order method needs to be reworked for the basket
        name: "OrderInfoInputSection",
        data(){
            return {
                newOrderProducts: {
                    Products: [],
                },
                productId: "",
                // schemas
                newProduct: {
                    id: 'required'
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
        methods: {
            async createOrder() {
                await 
                fetch('http://localhost:8080/orders', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.newOrderProducts)
                });
                this.$router.push({ name: 'orders' });
            },
            addProduct() {
                if(!this.newOrderProducts.Products.includes(this.productId)){
                this.newOrderProducts.Products.push(this.productId);
                }
                this.productId = "";
            },
        },
    }
</script>

<template>
<div>
    {{ newOrderProducts }}
    {{ productId }}
        <VeeForm :validation-schema="newProduct" @submit="addProduct">
            <div>
            Product ID:
            <VeeField name="id" as="input" v-model="productId" />
            <ErrorMessage name="id" />
            </div>
            <button type="submit">Add Product</button>
        </VeeForm>

        <button @click="createOrder" :disabled="!newOrderProducts.Products.length">Create</button>
        <button type="button" @click="$router.push({ name: 'orders' })">Back</button>
    </div>
</template>
<script>
    export default{
        // NB! The add order method needs to be reworked for the basket
        name: "OrderInfoInputSection",
        data(){
            return {
                newOrderProducts: {
                    Products: [],
                },
                Status: "",
                productId: "",
                // schemas
                orderConfirmation:{
                    Status: 'required'
                },
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
        computed: {
            editMode() {
                return this.seekID
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
            async updateOrder(){
                await fetch(`http://localhost:8080/orders/${this.seekID}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.Status)
                });
                this.$router.push({ name: 'orders' });
            },
            addProduct() {
                this.newOrderProducts.Products.push(this.productId);
                this.productId = "";
            },
        },
    }
</script>

<template>
<div v-if="!editMode">
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
    <div v-else>
        <VeeForm :validation-schema="schema" @submit="updateProduct">
            <div>
                Name:
                <VeeField
                name="Name"
                as="input"
                type="text"
                v-model="newProductData.Name"
                />
            </div>
            <ErrorMessage name="Name" />

            <div>
                Price:
                <VeeField
                name="Price"
                as="input"
                step="0.01"
                type="number"
                v-model="newProductData.Price"
                />
            </div>
            <ErrorMessage name="Price" />

            <div>
                Image:
                <VeeField
                name="Image"
                type="text"
                as="input"
                v-model="newProductData.Image"
                />
            </div>
        <ErrorMessage name="Image"/>

        <button type="submit">Update</button>
        <button type="button" @click="$router.push({ name: 'products' })">Back</button>
        </VeeForm>
    </div>
</template>
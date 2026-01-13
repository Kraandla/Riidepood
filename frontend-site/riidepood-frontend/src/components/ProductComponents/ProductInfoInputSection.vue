<script>
    export default{
        name: "ProductInfoInputSection",
        data(){
            return {
                newProductData: {
                    Name: "",
                    Price: 0,
                    Image: "",
                },
                schema:{
                    Name: 'required|min:3|max:25',
                    Price: 'required|min_value:0.10',
                    Image: ''
                },
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
                await fetch(`http://localhost:8080/products/${this.seekID}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.newProductData)
                });
                this.$router.push({ name: 'products' });
            },
        },
    }
</script>

<template>
<div v-if="!editMode">
        <VeeForm :validation-schema="schema" @submit="createProduct">
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

        <button type="submit">Create</button>
        <button type="button" @click="$router.push({ name: 'products' })">Back</button>
        </VeeForm>
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
<script>
    import router from "../../router/index"
    import ProductDetailsTable from '../../components/ProductComponents/ProductDetailsTable.vue';
    import ProductInputSection from '../../components/ProductComponents/ProductInputSection.vue'
    import DescriptionInputSection from "@/components/ProductComponents/DescriptionInputSection.vue";

    export default {
        components: {
            ProductDetailsTable,
            ProductInputSection,
            DescriptionInputSection
        },
        data() {
            return {
                thisProduct: null,
                thisDescription: null,
                productToBeEdited: null,
                addDescription: false,
                descriptionToBeCreated: {
                    ProductID: "",
                    Material: "",
                    Color: "",
                    Size: ""
                },
                descriptionToBeEdited: {
                    Material: "",
                    Color: "",
                    Size: ""
                },
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
            this.thisProduct = await (await fetch(`http://localhost:8080/products/${this.seekID}`)).json();
            if (this.thisProduct.DescriptionDescriptionID) {
                this.thisDescription = await (await fetch(`http://localhost:8080/descriptions/${this.thisProduct.DescriptionDescriptionID}`)).json();
            }
        },

        computed: {
            editMode() {
                return this.seekID
            },
        },
        methods: {
            async handleSubmit(){
                const isValidProductForm = await this.$refs.productInputForm.validateForm();
                let isValidDescriptionForm = null;
                if(this.addDescription) {
                    isValidDescriptionForm = await this.$refs.descriptionInputForm.validateForm();
                }
                if(isValidProductForm) {  
                    this.productToBeEdited = this.$refs.productInputForm.getValues();
                }
                if(this.addDescription) {    
                    if(isValidDescriptionForm){
                        this.descriptionToBeEdited = this.$refs.descriptionInputForm.getValues();
                    }
                }
                if(this.editMode){
                    this.updateProduct();
                } else {
                    this.createProduct();
                }
            },
            async createProduct() {
                const response = await fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.productToBeEdited)
                });

                if(this.addDescription) {
                    const createdProduct = await response.json();
                    this.descriptionToBeCreated.ProductID = createdProduct.ProductID;
                    await fetch('http://localhost:8080/descriptions', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(this.descriptionToBeEdited)
                    });
                }
                this.$router.push({ name: 'products' });
            },
            async updateProduct(){
                await fetch(`http://localhost:8080/products/${this.seekID}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.productToBeEdited)
                });
                this.$router.push({ name: 'products' });
            },
            async deleteDescription(){
                    await fetch(`http://localhost:8080/descriptions/${this.thisProduct.DescriptionDescriptionID}`, {
                        method: 'DELETE',
                    });
                this.$router.go();
            }
        },
    }

</script>

<template v-if="thisProduct">
<div v-if="!editMode">
    
    <ProductInputSection ref="productInputForm" :seekID="seekID"/>
    <button type="button" v-if="!addDescription" @click="addDescription = true">Add description</button>
    <DescriptionInputSection v-if="addDescription" ref="descriptionInputForm"/>
    
    <div>
        <button @click="handleSubmit()">Create</button>
        <button type="button" @click="$router.push({ name: 'products' })">Back</button>
        <button type="button" v-if="addDescription" @click="addDescription = false">Remove description</button>
    </div>

 </div>

 <div v-else>
        <ProductDetailsTable :thisProduct="thisProduct" :thisDescription="thisDescription"/>
    <h1>Update Item</h1>
        <ProductInputSection ref="productInputForm" :seekID="seekID"/>
        <button type="button" v-if="!addDescription" @click="addDescription = true">Edit Description</button>
    <div v-if="addDescription">
        <DescriptionInputSection :seekID="seekID" ref="descriptionInputForm"/>
    </div>

    <div>
        <button @click="handleSubmit()">Confirm edit</button>
        <button type="button" v-if="addDescription" @click="addDescription = false">Remove current edit description</button>
        <button type="button" v-if="addDescription && thisProduct.DescriptionDescriptionID" @click="deleteDescription">Delete description</button>
        <button type="button" @click="$router.push({ name: 'products' })">Back</button>
    </div>
 </div>
</template>
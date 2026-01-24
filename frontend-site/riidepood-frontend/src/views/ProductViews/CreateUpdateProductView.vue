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
                descriptionWillBeValidatedCheck: false,
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
            async formValidation(){
                const isValidProductForm = await this.$refs.productInputForm.validateForm();
                let isValidDescriptionForm = null;

                if(this.descriptionWillBeValidatedCheck) {
                    isValidDescriptionForm = await this.$refs.descriptionInputForm.validateForm();
                }
                if(isValidProductForm) {  
                    this.productToBeEdited = this.$refs.productInputForm.getValues();
                }
                if(this.descriptionWillBeValidatedCheck) {    
                    if(isValidDescriptionForm){
                        this.descriptionToBeEdited = this.$refs.descriptionInputForm.getValues();
                        this.descriptionToBeCreated = this.$refs.descriptionInputForm.getValues();
                    }
                }

                if (isValidProductForm || isValidDescriptionForm) {
                    this.handleSubmit(isValidProductForm, isValidDescriptionForm);
                }
            },
            async handleSubmit(productForm, descriptionForm){
                let checkForProductDescription = this.thisProduct.DescriptionDescriptionID != null;
                if(this.editMode){
                    if (productForm) {
                        this.updateProduct();
                    }
                    if (descriptionForm) {
                        if (descriptionForm && checkForProductDescription) {
                            this.updateDescription();
                        } else {
                            this.createNewDescription(this.seekID);
                        }
                    }
                } else {
                    if (productForm)  {
                        this.createProduct(descriptionForm);
                    }
                }
            },

            async createProduct(descriptionForm) {
                const response = await fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(this.productToBeEdited)
                });

                if (descriptionForm){
                    const createdProduct = await response.json();
                    this.createNewDescription(createdProduct.ProductID);
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
            },

            async createNewDescription(productId) {               
                if(this.descriptionWillBeValidatedCheck) {
                    this.descriptionToBeCreated.ProductID = productId;
                    await fetch('http://localhost:8080/descriptions', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(this.descriptionToBeCreated)
                    });
                }
            },

            async updateDescription() {                               
                if(this.descriptionWillBeValidatedCheck) {
                    await fetch(`http://localhost:8080/descriptions/${this.thisProduct.DescriptionDescriptionID}`, {
                        method: 'PUT',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(this.descriptionToBeEdited)
                    });
                }
            }
        },
    }

</script>

<template v-if="thisProduct">
<div v-if="!editMode">
    
    <ProductInputSection ref="productInputForm" :seekID="seekID"/>
    <button type="button" v-if="!descriptionWillBeValidatedCheck" @click="descriptionWillBeValidatedCheck = true">Add description</button>
    <DescriptionInputSection :descr v-if="descriptionWillBeValidatedCheck" ref="descriptionInputForm"/>
    
    <div>
        <button @click="formValidation()">Create</button>
        <button type="button" @click="$router.push({ name: 'products' })">Back</button>
        <button type="button" v-if="descriptionWillBeValidatedCheck" @click="descriptionWillBeValidatedCheck = false">Remove description</button>
    </div>

 </div>

 <div v-else>
        <ProductDetailsTable :thisProduct="thisProduct" :thisDescription="thisDescription"/>
    <h1>Update Item</h1>
        <ProductInputSection ref="productInputForm" :seekID="seekID"/>
        <button type="button" v-if="!descriptionWillBeValidatedCheck" @click="descriptionWillBeValidatedCheck = true">Edit Description</button>
    <div v-if="descriptionWillBeValidatedCheck">
        <DescriptionInputSection :seekID="seekID" ref="descriptionInputForm"/>
    </div>

    <div>
        <button @click="formValidation()">Confirm edit</button>
        <button type="button" v-if="descriptionWillBeValidatedCheck" @click="descriptionWillBeValidatedCheck = false">Remove current edit description</button>
        <button type="button" v-if="descriptionWillBeValidatedCheck && thisProduct.DescriptionDescriptionID" @click="deleteDescription">Delete description</button>
        <button type="button" @click="$router.push({ name: 'products' })">Back</button>
    </div>
 </div>
</template>
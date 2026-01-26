<script>
    export default{
        name: "ProductInputSection",
        data(){
            return {
                newProductData: {
                    Name: "",
                    Price: null,
                    Image: "",
                },
                validationSchemas: {
                    create:{
                        Name: 'required|min:3|max:25',
                        Price: 'required|min_value:0.10',
                        Image: ''
                    },
                    edit:{
                        Name: 'min:3|max:25',
                        Price: 'min_value:0.10',
                        Image: ''
                    },
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
            },
            chooseSchema(){
                return this.editMode ? this.validationSchemas.edit : this.validationSchemas.create;
            }
        },
        methods: {
            async validateForm() {
                const result = await this.$refs.productInputForm.validate()
                return result.valid
            },
            getValues() {
                return this.newProductData
            }
        }
    }
</script>
<style>
    span.input-group-text{
        color: #f8f9fa
    }
    .input-group {
        margin: 20px 0px
    }
</style>

<template>
        <VeeForm ref="productInputForm" :validation-schema="chooseSchema">
            <div class="input-group">
                <span class="bg-dark input-group-text col-3" id="inputGroup-sizing-default">Name</span>
                <VeeField
                class="form-control"
                name="Name"
                as="input"
                type="text"
                v-model="newProductData.Name"
                />
            </div>
            <ErrorMessage class="error" name="Name" />

            <div class="input-group">
                <span class="bg-dark input-group-text col-3" id="inputGroup-sizing-default">Price</span>
                <VeeField
                class="form-control"
                name="Price"
                as="input"
                step="0.01"
                type="number"
                v-model="newProductData.Price"
                />
                <span class="bg-dark input-group-text" id="inputGroup-sizing-default">€</span>
            </div>
            <ErrorMessage class="error" name="Price" />

            <div class="input-group">
                <span class="bg-dark input-group-text col-3" id="inputGroup-sizing-default">Picture</span>
                <VeeField
                class="form-control"
                name="Image"
                type="text"
                as="input"
                v-model="newProductData.Image"
                />
            </div>
        <ErrorMessage class="error" name="Image"/>    
        </VeeForm>
</template>
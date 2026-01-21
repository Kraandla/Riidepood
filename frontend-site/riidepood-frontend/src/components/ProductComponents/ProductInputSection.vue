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

<template>
        <VeeForm ref="productInputForm" :validation-schema="chooseSchema">
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
        </VeeForm>
</template>
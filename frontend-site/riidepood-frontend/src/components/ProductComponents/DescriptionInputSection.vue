<script>
    import { required } from '@vee-validate/rules';
    export default{
        name: "DescriptionInputSection",
        data(){
            return {
                descriptionToBeEdited: {
                    Material: "",
                    Color: "",
                    Size: ""
                },
                validationSchemas: {
                    create:{
                        Material: 'required|min:3|max:25',
                        Color: 'required|min:3|max:25',
                        Size: 'required'
                    },
                    edit:{
                        Material: 'min:3|max:25',
                        Color: 'min:3|max:25',
                        Size: ''
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
                const result = await this.$refs.descriptionInputForm.validate()
            return result.valid
            },
            getValues() {
                return this.descriptionToBeEdited
            },
        }
    }
</script>

<template>
        <VeeForm ref="descriptionInputForm" :validation-schema="chooseSchema">
            <div>
                Material:
                <VeeField
                name="Material"
                as="input"
                type="text"
                v-model="descriptionToBeEdited.Material"
                />
            </div>
            <ErrorMessage name="Material" />

            <div>
                Color:
                <VeeField
                name="Color"
                as="input"
                type="text"
                v-model="descriptionToBeEdited.Color"
                />
            </div>
            <ErrorMessage name="Color" />

            <div>
                Size:
                <VeeField
                name="Size"
                type="text"
                as="input"
                v-model="descriptionToBeEdited.Size"
                />
            </div>
        <ErrorMessage name="Size"/>
        </VeeForm>
</template>
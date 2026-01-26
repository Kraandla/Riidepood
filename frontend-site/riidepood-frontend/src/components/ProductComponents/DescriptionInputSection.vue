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
            <div class="input-group">
                <span class="bg-dark input-group-text col-4" id="inputGroup-sizing-default">Material</span>
                <VeeField
                class="form-control"
                name="Material"
                as="input"
                type="text"
                v-model="descriptionToBeEdited.Material"
                />
            </div>
            <ErrorMessage class="error" name="Material" />

            <div class="input-group">
                <span class="bg-dark input-group-text col-4" id="inputGroup-sizing-default">Color</span>
                <VeeField
                class="form-control"
                name="Color"
                as="input"
                type="text"
                v-model="descriptionToBeEdited.Color"
                />
            </div>
            <ErrorMessage class="error" name="Color" />

            <div class="input-group">
                <span class="bg-dark input-group-text col-4" id="inputGroup-sizing-default">Size</span>
                <VeeField
                class="form-control"
                name="Size"
                type="text"
                as="input"
                v-model="descriptionToBeEdited.Size"
                />
            </div>
        <ErrorMessage class="error" name="Size"/>
        </VeeForm>
</template>
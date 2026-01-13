<script>
    import router from "../../router/index"
    import ProductDetailsTable from '../../components/ProductComponents/ProductDetailsTable.vue';
    import ProductInfoInputSection from '../../components/ProductComponents/ProductInfoInputSection.vue'
    export default {
        components: {
            ProductDetailsTable,
            ProductInfoInputSection
        },
        data() {
            return {
                productToBeModified: {
                    ProductID: this.seekID,
                    Name: "",
                    Price: 0,
                    Image: ""
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
            this.productToBeModified = await (await fetch(`http://localhost:8080/products/${this.seekID}`)).json();
        },

        computed: {
            editMode() {
                return this.seekID
            }
        },
    }

</script>

<template>
<div v-if="!editMode">
    <ProductInfoInputSection :seekID="seekID"/>
 </div>
 <div v-else>
    <ProductDetailsTable :thisProduct="productToBeModified"/>
    <h1>Update Item</h1>
    <ProductInfoInputSection :seekID="seekID"/>
 </div>
</template>
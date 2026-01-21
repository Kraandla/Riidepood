<script>
    import ProductDetailsTable from '../../components/ProductComponents/ProductDetailsTable.vue';

    export default {
        components: {
            ProductDetailsTable
        },
        data() {
            return {
                thisProduct: null,
                thisDescription: {
                    Material: "",
                    Color: "",
                    Size: "",
                },
            }
        },
        props: {
            seekID: {
                type: String,
                required: true
            }
        },
        async created() {
            this.thisProduct = await (await fetch(`http://localhost:8080/products/${this.seekID}`)).json();
            if (this.thisProduct.DescriptionDescriptionID) {
                this.thisDescription = await (await fetch(`http://localhost:8080/descriptions/${this.thisProduct.DescriptionDescriptionID}`)).json();
            }
        }
    }
</script>

<template>
    <ProductDetailsTable :thisProduct="thisProduct" :thisDescription="thisDescription"/>
    <button type="button" @click="$router.push({ name: 'products' })">Back</button>
</template>
<script>
    import ProductDetailsTable from '../../components/ProductComponents/ProductDetailsTable.vue';

    export default {
        components: {
            ProductDetailsTable
        },
        data() {
            return {
                thisProduct: {
                    ProductID: this.seekID,
                    Name: "",
                    Price: 0,
                    Image: ""
                }
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
    }
    }
</script>

<template> 
    <ProductDetailsTable :thisProduct="thisProduct"/>
</template>
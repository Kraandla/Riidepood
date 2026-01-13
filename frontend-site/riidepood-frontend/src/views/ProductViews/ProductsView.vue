<script> 
    import ProductsTable from '../../components/ProductComponents/ProductsTable.vue'
    
    export default {
        components: {
            ProductsTable
        },
        data() {
            return {
            allProducts: []
            }
        },
        async created() {
            this.allProducts = await (await fetch('http://localhost:8080/products')).json();
        }
    }
</script>

<template>
    <main>
        <ProductsTable :items="allProducts"/>
    </main>
</template>
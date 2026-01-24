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
        <ProductDetailsTable class="flex-row" :thisProduct="thisProduct" :thisDescription="thisDescription"/>
        <div class="d-flex mt-0 justify-content-center table-responsive w-100">
            <button class="btn btn-secondary w-50 rounded-top-0" type="button" @click="$router.push({ name: 'products' })">Back</button>  
        </div>
</template>
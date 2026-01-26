<script>
    export default{
        name: "ProductDeleteButton",
        data(){
            thisProduct: null
        },
        props: {
            seekID: {
                type: String,
                required: true
            },
            items: Array,
        },
        methods: {
            async deleteProduct(){
                this.thisProduct = await (await fetch(`http://localhost:8080/products/${this.seekID}`)).json();
                const descriptionCheck = this.thisProduct.DescriptionDescriptionID != null;

                await fetch(`http://localhost:8080/products/${this.seekID}`, {
                    method: 'DELETE',
                });
                if (descriptionCheck) {
                    await fetch(`http://localhost:8080/descriptions/${this.thisProduct.DescriptionDescriptionID}`, {
                        method: 'DELETE',
                    });
                }
                
                this.$router.go();
            }
        },
    }
</script>

<template>
        <button class="btn btn-danger col-5 ms-auto" @click="deleteProduct">Delete</button>
</template>
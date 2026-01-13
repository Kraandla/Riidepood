<script>
    export default{
        name: "ProductDeleteButton",
        data(){
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
                await fetch(`http://localhost:8080/products/${this.seekID}`, {
                    method: 'DELETE',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ProductID: this.seekID})
                });
                this.$router.go();
            }
        },
    }
</script>

<template>
        <button @click="deleteProduct">Delete</button>
</template>
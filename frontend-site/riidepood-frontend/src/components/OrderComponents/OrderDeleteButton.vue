<script>
    export default{
        name: "OrderDeleteButton",
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
            async deleteOrder(){
                await fetch(`http://localhost:8080/orders/${this.seekID}`, {
                    method: 'DELETE',
                });
                this.$router.go();
            }
        },
    }
</script>

<template>
        <button @click="deleteOrder">Delete</button>
</template>
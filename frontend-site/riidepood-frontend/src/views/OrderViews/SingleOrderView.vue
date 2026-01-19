<script>
    import OrderDetailsTable from '../../components/OrderComponents/OrderDetailsTable.vue';

    export default {
        components: {
            OrderDetailsTable
        },
        data() {
            return {
                thisOrder: {
                    OrderID: this.seekID,
                    Status: "",
                    Products: []
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
        
        this.thisOrder = await (await fetch(`http://localhost:8080/orders/${this.seekID}`)).json();
    }
    }
</script>

<template> 
    <OrderDetailsTable :thisOrder="thisOrder"/>
</template>
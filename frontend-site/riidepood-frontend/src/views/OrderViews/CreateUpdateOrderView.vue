<script>
    import router from "../../router/index"
    import OrderDetailsTable from '../../components/OrderComponents/OrderDetailsTable.vue';
    import OrderInfoInputSection from '../../components/OrderComponents/OrderInfoInputSection.vue'
    export default {
        components: {
            OrderDetailsTable,
            OrderInfoInputSection
        },
        data() {
            return {
                orderToBeModified: {
                    OrderID: this.seekID,
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
            this.orderToBeModified = await (await fetch(`http://localhost:8080/Orders/${this.seekID}`)).json();
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
    <OrderInfoInputSection :seekID="seekID"/>
 </div>
 <div v-else>
    <OrderDetailsTable :thisOrder="orderToBeModified"/>
    <h1>Update Item</h1>
    <OrderInfoInputSection :seekID="seekID"/>
 </div>
</template>
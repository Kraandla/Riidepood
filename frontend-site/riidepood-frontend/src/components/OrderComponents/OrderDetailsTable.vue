<script>
    export default{
        name: "OrderDetailsTable",
        props: {
            thisOrder: JSON,
        }
    }
</script>

<template>
    <div class="d-flex mt-0 justify-content-center table-responsive w-100">
    <table class="details-table" v-if="thisOrder">
        <tbody>
     

        <tr v-for="item in thisOrder.Products">
       
            <td v-if="thisOrder.Products" class="text-end">
            <span
               
                :key="item.ProductID"
            >
            <img :src="item.Image" alt="Product Image" width="50" height="50" radius="50"/>
                {{ item.Name }} - Price: {{ item.Price }} € <br />
            </span>

            </td>
          
        </tr>
        <tr>
           
            <td class="text-end">
                Order total cost:
                {{
                    thisOrder.Products
                        .reduce((sum, item) => sum + item.Price, 0)
                        .toFixed(2)
                }} €
            </td>
        </tr>
        </tbody>
    </table>
    </div>

</template>
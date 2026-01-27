<script>
    export default{
        data(){
            return {
            }
        },
        name: "ProductDetailsTable",
        props: {
            thisProduct: Object,
            thisDescription: Object,
            descriptionId: String,
        },
    }
</script>

<style>
    td {
        text-align:start;
    }
</style>
<template>
    <div class="d-flex mt-0 justify-content-center table-responsive w-100">
    <table class="details-table mt-5"  v-if="thisProduct" >
        <tbody>
            <tr >
               
                <td colspan="2" class="text-center"><img :src="thisProduct.Image" alt="Product Image" width="150" height="150" style="border-radius: 20px;"/></td>
            </tr>
            <tr>
                <td>Product Name</td>
                <td>{{thisProduct.Name}}</td>
            </tr>
            <tr>
                <td>Product Price</td>
                <td>{{thisProduct.Price}}</td>
            </tr>
       
                <tr v-if="thisProduct.DescriptionDescriptionID">
                    <td>Product Material</td>
                    <td v-if="thisDescription">{{thisDescription.Material}}</td>
                </tr>
                <tr v-if="thisProduct.DescriptionDescriptionID">
                    <td>Product Color</td>
                    <td v-if="thisDescription">{{thisDescription.Color}}</td>
                </tr>
                <tr v-if="thisProduct.DescriptionDescriptionID">
                    <td>Product Size</td>
                    <td v-if="thisDescription">{{thisDescription.Size}}</td>
                </tr>
            </tbody>
    </table>
    </div>
</template>
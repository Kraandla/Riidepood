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
    <div class="d-flex mt-5 justify-content-center table-responsive w-100">
    <table class="table table-bordered table-dark table-striped w-50 mb-0" v-if="thisProduct">
        <tbody class="border-dark border-5">
            <tr class="border border-2">
                <td class="w-25">Product ID</td>
                <td class="text-start">{{thisProduct.ProductID}}</td>
            </tr>
            <tr class="border border-2">
                <td>Product Name</td>
                <td>{{thisProduct.Name}}</td>
            </tr>
            <tr class="border border-2">
                <td>Product Price</td>
                <td>{{thisProduct.Price}}</td>
            </tr>
            <tr class="border border-2">
                <td>Product Image</td>
                <td>{{thisProduct.Image}}</td>
            </tr class="border border-2">
                <tr class="border border-2" v-if="thisProduct.DescriptionDescriptionID">
                    <td>Product Material</td>
                    <td v-if="thisDescription">{{thisDescription.Material}}</td>
                </tr>
                <tr class="border border-2" v-if="thisProduct.DescriptionDescriptionID">
                    <td>Product Color</td>
                    <td v-if="thisDescription">{{thisDescription.Color}}</td>
                </tr>
                <tr class="border border-2" v-if="thisProduct.DescriptionDescriptionID">
                    <td>Product Size</td>
                    <td v-if="thisDescription">{{thisDescription.Size}}</td>
                </tr>
            </tbody>
    </table>
    </div>
</template>
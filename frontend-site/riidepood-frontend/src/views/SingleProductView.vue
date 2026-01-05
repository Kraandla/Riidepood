<script>
    // import ProductDetailsTable from '../components/ProductDetailsTable';

    export default{
        data(){
            return{
                thisProduct: {
                    ProductID: "",
                    Name: "",
                    Price: 0,
                    Image: ""
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
            this.thisProduct = await (await fetch(`http://localhost:8080/products/${this.seekID}`)).json();
        }

    }
</script>

<template> 
    <table class="table table-striped">
            <tr>
                <td>Product ID</td>
                <td>{{thisProduct.ProductID}}</td>
            </tr>
            <tr>
                <td>Product Name</td>
                <td>{{thisProduct.Name}}</td>
            </tr>
            <tr>
                <td>Product Price</td>
                <td>{{thisProduct.Price}}</td>
            </tr>
            <tr>
                <td>Product Image</td>
                <td>{{thisProduct.Image}}</td>
            </tr>
    </table>
</template>
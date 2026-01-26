<script>
import AddToCart from './AddToCart.vue';
import ProductDeleteButton from './ProductComponents/ProductDeleteButton.vue'

export default {
    components: {
        ProductDeleteButton,
        AddToCart
    },
    data() {
        return {
            allProducts: []
        }
    },
    async created() {
        const response = await fetch('http://localhost:8080/products')
        this.allProducts = await response.json()
    },
    methods: {
        goToProductDetails(item) {
            this.$router.push({
                name: 'singleProduct',
                params: { itemID: item.ProductID }
            })
        }
    }
}
</script>


<template>
    <div class="container-fluid py-4">
        <h1 class="mb-4">All Products</h1>

        <div class="row g-4">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="item in allProducts" :key="item.ProductID">
                <div class="card h-100 shadow-sm">

                    <!-- Image -->
                    <div
                        class="card-img-top d-flex align-items-center justify-content-center bg-light"
                        style="height: 180px; cursor: pointer;"
                        @click="goToProductDetails(item)"
                    >
                        <span v-if="!item.Image">No image</span>
                        <img
                            v-else
                            :src="item.Image"
                            class="img-fluid h-100 w-100"
                            style="object-fit: cover;"
                        />
                    </div>

                    <!-- Body -->
                    <div class="card-body">
                        <h5
                            class="card-title"
                            style="cursor: pointer;"
                            @click="goToProductDetails(item)"
                        >
                            {{ item.Name }}
                        </h5>

                        <p class="card-text mb-1">
                            <strong>ID:</strong> {{ item.ProductID }}
                        </p>

                        <p class="card-text">
                            <strong>Price:</strong> {{ item.Price }} €
                        </p>
                    </div>

                    <!-- Footer -->
                    <div class="card-footer bg-transparent border-top-0">
                        <div class="d-flex justify-content-between align-items-center">
                            <router-link
                                class="btn btn-sm btn-primary"
                                :to="{ name: 'singleProduct', params: { itemID: item.ProductID } }"
                            >
                                Details
                            </router-link>

                          <add-to-cart :product-id="item.ProductID"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

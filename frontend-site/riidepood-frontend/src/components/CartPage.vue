<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../plugins/basket'
import { useApi } from '../composables/useApi'

export default defineComponent({
  setup() {
    const cart = useCartStore()
    const { items: cartItems } = storeToRefs(cart)
    const { remove, clear, checkout } = cart

    const api = useApi()
    const products = ref<any[]>([])

    const loadProducts = async (ids: string[]) => {
      products.value = await Promise.all(
        ids.map(async (id) => {
          try {
            const res = await api.get(`/products/${id}`)
            return res.data
          } catch {
            return { ProductID: id, Name: 'Unknown product', Price: 0 }
          }
        })
      )
    }

    watch(cartItems, (newIds: string[]) => {
      if (!newIds || newIds.length === 0) {
        products.value = []
        return
      }
      loadProducts(newIds)
    }, { immediate: true })

    return { cartItems, products, remove, clear, checkout }
  },
})
</script>

<template>


  <div v-if="products.length" class="align-items-center d-flex flex-column mt-3">
    <div v-for="prod in products" :key="prod.ProductID" class="mb-3 ">
      <div class="card w-150" >
        <div class="row g-0 align-items-center">
          <div class="col-auto">
            <img :src="prod.Image" alt="Product Image"
              style="height:120px; width:120px; object-fit:cover; padding:10px;" />
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ prod.Name }}</h5>
              <p class="card-text">Price: {{ prod.Price }}€</p>
            </div>
          </div>
          <div class="col-auto pe-3">
            <button class="btn btn-danger" @click="remove(prod.ProductID)">Remove</button>
          </div>
        </div>
      </div>
    </div>


    <div class="mt-3">
      <button class="btn btn-primary" @click="checkout">Checkout</button> |
      <button class="btn btn-secondary" @click="clear">Clear Cart</button>
    </div>
  </div>
  <div v-else>
    Cart is empty
  </div>

</template>
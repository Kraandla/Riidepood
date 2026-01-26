<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../plugins/basket'

export default defineComponent({
  setup() {
    const cart = useCartStore()

    const { items: cartItems } = storeToRefs(cart)
    const { remove, clear, checkout } = cart

    return { cartItems, remove, clear, checkout }
  },
})
</script>

<template>
  <div v-if="cartItems.length">
    <div v-for="id in cartItems" :key="id">
      {{ id }}
      <button @click="remove(id)">Remove</button>
    </div>
    <div>
        <button @click="checkout">Checkout</button>
        <button @click="clear">Clear Cart</button>
    </div>
  </div>
  <div v-else>
    Cart is empty
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useCartStore } from '../plugins/basket'

export default defineComponent({
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const cart = useCartStore()

    const inCart = computed(() => cart.isInCart(props.productId))
    const addToCart = () => cart.add(props.productId)

    return { inCart, addToCart }
  },
})
</script>

<template>
  <button class="btn btn-warning" @click="addToCart" :disabled="inCart">
    {{ inCart ? 'In Cart' : 'Add to Cart' }}
  </button>
</template>
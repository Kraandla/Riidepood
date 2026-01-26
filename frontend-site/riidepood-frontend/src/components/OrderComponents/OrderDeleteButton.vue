<script>
import { useApiPrivate } from '../../composables/useApi'

export default {
  name: "OrderDeleteButton",
  props: {
    seekID: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async deleteOrder() {
      if (this.disabled) return;
      try {
        await useApiPrivate().delete(`/orders/${this.seekID}`);
        this.$router.go();
      } catch (error) {
        console.error('Failed to delete order:', error);
        alert('Failed to delete order');
      }
    }
  }
}
</script>

<template>
  <button
    :class="disabled ? 'btn btn-secondary col-5 ms-auto' : 'btn btn-danger col-5 ms-auto'"
    :disabled="disabled"
    @click="deleteOrder"
    :title="disabled ? 'Cannot delete confirmed order' : 'Delete order'"
  >
    Delete
  </button>
</template>
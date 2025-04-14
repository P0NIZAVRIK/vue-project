<template>
  <div class="cart-button">
    <span class="cart-icon">🛒</span>
    <span v-if="itemCount > 0" class="cart-count">{{ itemCount }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CartButton',
  setup() {
    const store = useStore()
    const itemCount = computed(() => store.getters.cartItemCount)

    return {
      itemCount
    }
  }
}
</script>

<style scoped>
.cart-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 8px;
}

.cart-icon {
  font-size: 24px;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding: 0 4px;
}
</style> 
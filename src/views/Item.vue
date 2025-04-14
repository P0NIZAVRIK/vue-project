<template>
  <section class="site-main mb-5">
    <div class="container">
      <div class="card text-center card-product" v-if="product">
        <div class="card-product__img">
          <img class="card-img" :src="product.image" :alt="product.name">
        </div>
        <div class="card-body">
          <p>{{ product.country }}</p>
          <h4 class="card-product__title">{{ product.name }}</h4>
          <p class="card-product__price">{{ product.price }} руб</p>
          <p class="card-product__duration">
            <b>Длительность:</b>
            {{ product.duration }} дней / {{ product.duration - 1 }} ночей
          </p>
          <div class="card-product__description" v-html="product.description"></div>
          <p>
            <button 
              type="button" 
              class="btn" 
              :class="isInCart(product.id) ? 'btn-danger' : 'btn-primary'"
              @click="toggleCart(product)"
            >
              {{ isInCart(product.id) ? 'Отмена' : 'Заказать' }}
            </button>
          </p>
        </div>
      </div>
      <div v-else class="alert alert-warning">
        Тур не найден
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'Item',
  setup() {
    const store = useStore()
    const route = useRoute()
    const productId = parseInt(route.params.id)

    const product = computed(() => {
      return store.state.products.find(p => p.id === productId)
    })

    const cart = computed(() => store.state.cart)

    const isInCart = (productId) => {
      return cart.value.some(item => item.id === productId)
    }

    const toggleCart = (product) => {
      if (isInCart(product.id)) {
        store.dispatch('removeFromCart', product.id)
      } else {
        store.dispatch('addToCart', product)
      }
    }

    return {
      product,
      isInCart,
      toggleCart
    }
  }
}
</script>

<style scoped>
.card-product {
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  overflow: hidden;
}

.card-product__img {
  height: 400px;
  overflow: hidden;
  position: relative;
}

.card-product__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 30px;
}

.card-product__title {
  font-size: 2rem;
  font-weight: 600;
  margin: 20px 0;
  color: #2c3e50;
}

.card-product__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 20px 0;
}

.card-product__duration {
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 20px;
}

.card-product__description {
  text-align: left;
  margin: 30px 0;
}

.card-product__description h4 {
  color: #2c3e50;
  margin: 20px 0 10px;
}

.card-product__description p {
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 15px;
}

.card-product__description ul {
  padding-left: 20px;
  color: #34495e;
}

.btn {
  padding: 10px 25px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-danger {
  background-color: #e74c3c;
  border-color: #e74c3c;
}

.btn-danger:hover {
  background-color: #c0392b;
  border-color: #c0392b;
}
</style> 
<template>
  <section class="site-main mb-5">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-5">
          <div class="filter-sidebar">
            <div class="filter-sidebar-header">Страны:</div>
            <div class="filter-sidebar-content">
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  name="country" 
                  id="country-0" 
                  value="all" 
                  v-model="selectedCountry"
                >
                <label class="form-check-label" for="country-0">
                  Все ({{ totalProducts }})
                </label>
              </div>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  name="country" 
                  id="country-1" 
                  value="Россия" 
                  v-model="selectedCountry"
                >
                <label class="form-check-label" for="country-1">
                  Россия ({{ getCountryCount('Россия') }})
                </label>
              </div>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  name="country" 
                  id="country-2" 
                  value="Франция" 
                  v-model="selectedCountry"
                >
                <label class="form-check-label" for="country-2">
                  Франция ({{ getCountryCount('Франция') }})
                </label>
              </div>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  name="country" 
                  id="country-3" 
                  value="Тайланд" 
                  v-model="selectedCountry"
                >
                <label class="form-check-label" for="country-3">
                  Тайланд ({{ getCountryCount('Тайланд') }})
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-8 col-md-7">
          <div class="filter-bar">
            <div>
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Название города"
                  v-model="searchQuery"
                  @input="filterProducts"
                >
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">Искать</button>
                </div>
              </div>
            </div>
          </div>

          <section class="lattest-product-area pb-40 category-list">
            <div class="card-grid">
              <div 
                class="card text-center card-product" 
                v-for="product in filteredProducts" 
                :key="product.id"
              >
                <div class="card-product__img">
                  <router-link :to="'/item/' + product.id">
                    <img class="card-img" :src="product.image" :alt="product.name">
                  </router-link>
                </div>
                <div class="card-body">
                  <p>{{ product.country }}</p>
                  <h4 class="card-product__title">
                    <router-link :to="'/item/' + product.id">
                      {{ product.name }}
                    </router-link>
                  </h4>
                  <p class="card-product__price">{{ product.price }} руб</p>
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
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const products = computed(() => store.state.products)
    const cart = computed(() => store.state.cart)
    const selectedCountry = ref('all')
    const searchQuery = ref('')

    const totalProducts = computed(() => products.value.length)

    const getCountryCount = (country) => {
      return products.value.filter(product => product.country === country).length
    }

    const filteredProducts = computed(() => {
      let filtered = [...products.value]

      // Фильтрация по стране
      if (selectedCountry.value !== 'all') {
        filtered = filtered.filter(product => product.country === selectedCountry.value)
      }

      // Фильтрация по поисковому запросу
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.country.toLowerCase().includes(query)
        )
      }

      return filtered
    })

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
      products,
      cart,
      selectedCountry,
      searchQuery,
      totalProducts,
      getCountryCount,
      filteredProducts,
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 30px;
  overflow: hidden;
}

.card-product:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card-product__img {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.card-product__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-product:hover .card-product__img img {
  transform: scale(1.1);
}

.card-body {
  padding: 20px;
}

.card-product__title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 10px 0;
  color: #000000;
}

.card-product__title a {
  color: #000000;
  text-decoration: none;
}

.card-product__title a:hover {
  color: #000000;
  text-decoration: none;
}

.card-product__price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #000000;
  margin: 15px 0;
}

.card-body p {
  color: #000000;
  margin-bottom: 10px;
}

.card-body p:first-child {
  font-weight: bold;
}

.btn {
  padding: 8px 20px;
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.filter-sidebar {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filter-sidebar-header {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c3e50;
}

.filter-sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-check {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-check-input {
  width: 18px;
  height: 18px;
  margin-top: 0;
}

.form-check-label {
  font-size: 1rem;
  color: #34495e;
}

.filter-bar {
  margin-bottom: 20px;
}

.input-group {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.form-control {
  border: none;
  padding: 12px 15px;
  font-size: 1rem;
}

.form-control:focus {
  box-shadow: none;
}

.input-group-append .btn {
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  border: none;
}

.input-group-append .btn:hover {
  background-color: #2980b9;
}
</style> 
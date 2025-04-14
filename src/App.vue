<template>
  <div id="app">
    <header class="site-header">
      <div class="main_menu">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container">
            <router-link to="/" class="navbar-brand site-header-logo">Путевки онлайн</router-link>
            <router-link to="/cart" class="btn btn-primary">
              Корзина <span class="badge badge-light">{{ cartItemCount }}</span>
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <router-view />

    <footer>
      <div class="footer-bottom">
        <div class="container">
          <div class="row d-flex">
            <p class="col-lg-12 footer-text text-center">
              Copyright ©2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const cartItemCount = computed(() => store.getters.cartItemCount)

    return {
      cartItemCount
    }
  }
}
</script>

<style>
@import './assets/css/main.css';
</style> 
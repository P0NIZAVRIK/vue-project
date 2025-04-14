import { createStore } from 'vuex'
import data from '../../mock-server/db.json'

const images = {
  'moscow.jpg': require('@/assets/images/moscow.jpg'),
  'paris.jpg': require('@/assets/images/paris.jpg'),
  'bangkok.jpg': require('@/assets/images/bangkok.jpg'),
  'phuket.jpg': require('@/assets/images/phuket.jpg'),
  'peter.jpg': require('@/assets/images/peter.jpg')
}

export default createStore({
  state: {
    products: data.items.map(item => ({
      id: parseInt(item.id),
      name: item.title,
      country: data.countries.find(country => country.id === item.countryId).title,
      price: item.price,
      image: images[item.image],
      description: item.description,
      duration: item.duration
    })),
    cart: []
  },
  getters: {
    cartItemCount: state => state.cart.length,
    cartTotalPrice: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  mutations: {
    addToCart(state, product) {
      const cartItem = state.cart.find(item => item.id === product.id)
      if (cartItem) {
        cartItem.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    updateQuantity(state, { productId, quantity }) {
      const cartItem = state.cart.find(item => item.id === productId)
      if (cartItem) {
        cartItem.quantity = quantity
      }
    },
    clearCart(state) {
      state.cart = []
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId)
    },
    updateQuantity({ commit }, payload) {
      commit('updateQuantity', payload)
    },
    clearCart({ commit }) {
      commit('clearCart')
    }
  }
}) 
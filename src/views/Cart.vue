<template>
  <section class="site-main mb-5">
    <div class="container">
      <div v-if="cart.length === 0" class="alert alert-info">
        Корзина пуста
      </div>
      <div v-else>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Путевка</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Сумма</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="item.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.price.toLocaleString() }} руб</td>
              <td>
                <input 
                  type="number" 
                  class="form-control cart-number" 
                  v-model="item.quantity" 
                  min="1"
                  @change="updateQuantity(item)"
                >
              </td>
              <td>{{ (item.price * item.quantity).toLocaleString() }} руб</td>
              <td>
                <button 
                  type="button" 
                  class="btn btn-danger"
                  @click="removeFromCart(item.id)"
                >
                  Удалить
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" colspan="3">&nbsp;</th>
              <td><b>Итого:</b></td>
              <td>{{ totalPrice.toLocaleString() }} руб</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>

        <div class="order-form mt-5">
          <h3>Оформление заказа</h3>
          <form @submit.prevent="submitOrder" class="mt-4">
            <div class="form-group">
              <label for="name">Ваше имя</label>
              <input 
                type="text" 
                class="form-control" 
                id="name" 
                v-model="orderForm.name"
                required
              >
            </div>
            <div class="form-group">
              <label for="phone">Телефон</label>
              <input 
                type="tel" 
                class="form-control" 
                id="phone" 
                v-model="orderForm.phone"
                required
                placeholder="+7 (999) 123-45-67"
              >
            </div>
            <button 
              type="submit" 
              class="btn btn-primary mt-3"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Отправка...' : 'Оформить заказ' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Cart',
  setup() {
    const store = useStore()
    const router = useRouter()
    const cart = computed(() => store.state.cart)
    const isSubmitting = ref(false)

    const orderForm = ref({
      name: '',
      phone: ''
    })

    const totalPrice = computed(() => {
      return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    const removeFromCart = (productId) => {
      store.dispatch('removeFromCart', productId)
    }

    const updateQuantity = (item) => {
      store.dispatch('updateQuantity', { productId: item.id, quantity: item.quantity })
    }

    const submitOrder = async () => {
      isSubmitting.value = true
      try {
        const order = {
          id: Math.random().toString(36).substr(2, 4),
          content: cart.value.map(item => ({
            itemId: item.id.toString(),
            count: item.quantity
          })),
          name: orderForm.value.name,
          phone: orderForm.value.phone
        }

        console.log('Order submitted:', order)
        
        store.dispatch('clearCart')
        
        router.push('/')
        
        alert('Заказ успешно оформлен!')
      } catch (error) {
        console.error('Error submitting order:', error)
        alert('Произошла ошибка при оформлении заказа')
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      cart,
      totalPrice,
      removeFromCart,
      updateQuantity,
      orderForm,
      submitOrder,
      isSubmitting
    }
  }
}
</script>

<style scoped>
.table {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  vertical-align: middle;
  padding: 15px;
}

.cart-number {
  width: 80px;
  text-align: center;
}

.btn-danger {
  background-color: #e74c3c;
  border-color: #e74c3c;
}

.btn-danger:hover {
  background-color: #c0392b;
  border-color: #c0392b;
}

.order-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.order-form h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 500;
  color: #34495e;
}

.form-control {
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 10px;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
  padding: 10px 25px;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-primary:disabled {
  background-color: #95a5a6;
  border-color: #95a5a6;
}
</style> 
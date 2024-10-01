<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <span v-if="orders.length === 0">Sipariş Yok</span>
          <span v-else>{{ orders.length }} Sipariş</span>
        </ion-title>

        <ion-buttons slot="end">
          <ion-button @click="presentModal">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="orders.length > 0">
        <ion-card v-for="order in orders" :key="order.id" style="margin-bottom: 1rem;">
          <ion-card-header>
            <ion-card-title>{{ order.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ order.notes }}</p>
            <p>{{ order.details }}</p>
            <p><strong>Tarih:</strong> {{ new Date(order.date).toLocaleString() }}</p>
          </ion-card-content>
          <ion-footer>
             <div class="button-group">
              <ion-button color="success" expand="full" @click="completeOrder(order.id)">
                <ion-icon slot="start" :icon="checkmark" style="font-size: 24px;"></ion-icon>
                Tamamla
              </ion-button>

              <ion-button color="danger" expand="full" @click="cancelOrder(order.id)">
                <ion-icon slot="start" :icon="close" style="font-size: 24px;"></ion-icon>
                İptal
              </ion-button>
            </div>
          </ion-footer>
        </ion-card>
      </div>

       <!-- FormAddOrder Component -->
      <FormAddOrder :isModalOpen="isModalOpen" @closeForm="closeModal" @addOrder="addNewOrder" />

    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from 'vue';

import { useOrderStore } from '../store/orders';
import { add, close, checkmark } from 'ionicons/icons';
import FormAddOrder from '../components/FormAddOrder.vue';


export default {
  components: {
    FormAddOrder
  },
  setup() {
    const orderStore = useOrderStore();
    const isModalOpen = ref(false);
    const presentModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const addNewOrder = (order) => {
      orderStore.currentOrders.push(order);
    };


    return {
      orders: orderStore.currentOrders,
      completeOrder: orderStore.completeOrder.bind(orderStore),
      presentModal,
      closeModal,
      isModalOpen,
      addNewOrder,
      add,
      close,
      checkmark
    };
  }
};
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
}

.button-group ion-button {
  flex: 0 0 48%;
}
</style>
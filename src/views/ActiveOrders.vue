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


    <ion-content >

        <ion-card  v-if="orders.length > 0" v-for="order in orders" :key="order.id" >
          <ion-item-sliding  >

            <ion-item class="item-content" >
              <ion-card-content class="card-content">
               <div class="left-section">
                  <ion-card-title>{{ order.name }}</ion-card-title>
                  <p >{{ order.details }}</p>
                  <p class="warning-text">{{ order.notes }}</p>
                </div>

                <div class="right-section">
                  <p class="order-time">{{ new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }}</p>
                  <ion-button color="success" @click="completeOrder(order.id)" class="complete-button">
                    <ion-icon slot="start" :icon="checkmark" style="font-size: 24px; margin: 0;"></ion-icon>
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-item>

            <ion-item-options side="end">
              <ion-item-option color="danger" expandable @click="cancelOrder(order.id)">
                <ion-icon slot="start" :icon="close" style="font-size: 24px;"></ion-icon>
                İptal
              </ion-item-option>
            </ion-item-options>

          </ion-item-sliding>
        </ion-card>

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

<!-- <style scoped>

.item-content {
  margin: 0; 
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Card content genişliği tam genişlik */
  border: 1px solid #ccc; /* İnce bir gri border */
  border-radius: 5px; /* Köşe yuvarlama */
  border-left: 5px solid green; /* Sol tarafta yeşil border */
}

.card-content {
  margin: 0; 
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Card content genişliği tam genişlik */
}

.left-section {
  flex: 1;
  text-align: left;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.order-time {
  font-weight: bold;
}

.complete-button {
  height: 50px;
  width: 50px;
}

.warning-text{
  font-size: 14px;
  color: red;
}

ion-item-sliding {
  --ion-item-sliding-side-margin: 0;
}

ion-item-options {
  width: auto;
}

</style> -->
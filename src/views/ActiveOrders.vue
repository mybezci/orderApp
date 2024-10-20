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

                <ion-grid  class="custom-grid">
                  <ion-row>
                    <ion-col size="10" class="active-left-col">
                      <ion-card-title>{{ order.name }}</ion-card-title>
                      <p>{{ order.detail }}</p>
                      <p class="warning-text">{{ order.note }}</p>
                    </ion-col>

                  <!-- Tamamlama Butonu ve Saat -->
                    <ion-col size="2" class="active-right-col">
                      <p class="order-time">{{ new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }}</p>
                      <ion-button color="success" @click="completeOrder(order.id)" class="complete-button">
                        <ion-icon slot="start" :icon="checkmark" style="font-size: 24px; margin: 0;"></ion-icon>
                      </ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>


                
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
import { computed, onMounted, ref } from 'vue';

import { useOrderStore } from '../store/orders';
import { add, close, checkmark } from 'ionicons/icons';
import FormAddOrder from '../components/FormAddOrder.vue';


export default {
  components: {
    FormAddOrder
  },
  setup() {
    const orderStore = useOrderStore();

    //const orders = ref([]);
    // Use computed to track orders from the store
    const orders = computed(() => orderStore.currentOrders);

    const loadOrders = async () => {    
      //orders.value = orderStore.currentOrders;
      await orderStore.fetchOrders();  // Fetch orders from Supabase on mount

    };


    onMounted(async () => {
      await loadOrders();
    });


    const isModalOpen = ref(false);
    const presentModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const addNewOrder = async(order) => {
      await orderStore.addOrderToSupabase(order);  // Add new order to Supabase      
    };

    const cancelOrder = async (id) => {
      await orderStore.cancelOrder(id);  // Cancel order in Supabase
    };


    return {
      orders,
      completeOrder: orderStore.completeOrder.bind(orderStore),
      presentModal,
      closeModal,
      isModalOpen,
      addNewOrder,
      cancelOrder,
      add,
      close,
      checkmark
    };
  }
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <span v-if="completedOrders.length === 0">Tamamlanmış sipariş Yok</span>
          <span v-else>{{ completedOrders.length }} Tamamlanmış sipariş</span>
        </ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content>
        <ion-card v-if="completedOrders.length > 0" v-for="order in completedOrders" :key="order.id" >
          <ion-item-sliding>
            <ion-item >
              <ion-card-content class="card-content">
                <ion-card-title>{{ order.name }}</ion-card-title>
                <p>{{ order.notes }}</p>
                <p class="order-time">{{ new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }}</p>
              </ion-card-content>
            </ion-item>

            <ion-item-options side="start">
              <ion-item-option color="danger" @click="moveToHistory(order.id)">
                <ion-icon :icon="close" slot="icon-only"></ion-icon>
                Sil
              </ion-item-option>
            </ion-item-options>

            <ion-item-options side="end">
              <ion-item-option color="primary" @click="restoreOrder(order.id)">
                <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
                Geri Al
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>

        </ion-card>
    </ion-content>
  </ion-page>

</template>

<script>
import { onMounted, ref } from 'vue';
import { useOrderStore } from '../store/orders';
import { arrowBack, close } from 'ionicons/icons';


export default {
  setup() {
    const orderStore = useOrderStore();

    const completedOrders = ref([]);

    const loadCompletedOrders = async () => {
      completedOrders.value = orderStore.completedOrders;
    };

    onMounted(async () => {
      await loadCompletedOrders(); 
    });

    const restoreOrder = (orderId) => {
      const orderIndex = orderStore.completedOrders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        const order = orderStore.completedOrders[orderIndex];
        orderStore.currentOrders.push(order);
        orderStore.completedOrders.splice(orderIndex, 1);
      }
    };

    const moveToHistory = (orderId) => {
      orderStore.moveToHistory(orderId); 
    };

    return {
      completedOrders,
      restoreOrder,
      moveToHistory,
      arrowBack,
      close
    };
  }
};
</script>



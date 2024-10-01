<template>
  <ion-page>
    <ion-content>
      <div v-if="completedOrders.length === 0">
        Tamamlanmış sipariş yok.
      </div>
      <div v-else>
        <ion-card v-for="order in completedOrders" :key="order.id" style="margin-bottom: 1rem;">
          <ion-card-header>
            <ion-card-title>{{ order.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ order.details }}</p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>

</template>

<script>
import { useOrderStore } from '../store/orders';

export default {
  setup() {
    const orderStore = useOrderStore();
    return {
      completedOrders: orderStore.completedOrders
    };
  }
};
</script>

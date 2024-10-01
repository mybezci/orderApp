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
      <div v-if="completedOrders.length > 0">
        <ion-card v-for="order in completedOrders" :key="order.id" style="margin-bottom: 1rem;">
          <ion-item-sliding>
            <ion-item>
              <ion-card-content>
                <p>{{ order.name }}</p>
                <p>{{ order.notes }}</p>
                <p><strong>Tarih:</strong> {{ new Date(order.date).toLocaleString() }}</p>
              </ion-card-content>
            </ion-item>

            <!-- Sağa veya sola kaydırılınca çıkan seçenekler -->
            <ion-item-options side="start">
              <ion-item-option color="primary" @click="restoreOrder(order.id)">
                <ion-icon :icon="arrow-back" slot="icon-only"></ion-icon>
                Geri Al
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
      </div>
    </ion-content>
  </ion-page>

</template>

<script>
import { useOrderStore } from '../store/orders';
import { arrowBack } from 'ionicons/icons';


export default {
  setup() {
    const orderStore = useOrderStore();

    const restoreOrder = (orderId) => {
      // Siparişi tamamlanan siparişlerden geri al ve aktif siparişlere ekle
      const orderIndex = orderStore.completedOrders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        const order = orderStore.completedOrders[orderIndex];
        // Siparişi aktif siparişlere ekle
        orderStore.currentOrders.push(order);
        // Tamamlanmış siparişlerden çıkar
        orderStore.completedOrders.splice(orderIndex, 1);
      }
    };

    return {
      completedOrders: orderStore.completedOrders,
      restoreOrder,
      arrowBack
    };
  }
};
</script>

<style scoped>
ion-card {
  margin-bottom: 1rem;
}
</style>

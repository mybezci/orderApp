import { defineStore } from 'pinia';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    currentOrders: [],
    completedOrders: [],
    historyOrders: [] 
  }),
  actions: {
    addOrder(order) {
      this.currentOrders.push(order);
    },
    completeOrder(orderId) {
      const orderIndex = this.currentOrders.findIndex(o => o.id === orderId);
      const order = this.currentOrders[orderIndex];
      this.currentOrders.splice(orderIndex, 1);
      this.completedOrders.push(order);
    },
    cancelOrder(orderId) {
      const orderIndex = this.currentOrders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        this.currentOrders.splice(orderIndex, 1); 
      }
    },
    moveToHistory(orderId) {
      const orderIndex = this.completedOrders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        const [canceledOrder] = this.completedOrders.splice(orderIndex, 1);
        this.historyOrders.push(canceledOrder); // İptal edilen sipariş history listesine taşınacak
      }
    }
  }
});

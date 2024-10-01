import { defineStore } from 'pinia';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    currentOrders: [],
    completedOrders: []
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
    }
  }
});

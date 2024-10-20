
// orderStore.js
import { defineStore } from 'pinia';
import { supabase } from '../supabaseClient'; // Supabase istemcisini ekliyoruz

export const useOrderStore = defineStore('orders', {
  state: () => ({
    currentOrders: [],
    completedOrders: [],
    historyOrders: []
  }),

  actions: {
    // Supabase'den siparişleri çekmek için bir action
    async fetchOrders() {
      try {
        let { data: orders, error } = await supabase
          .from('orders')
          .select('*'); // Tüm siparişleri çekiyoruz
          
        if (error) {
          throw error;
        }
        
        console.log('orders', orders)

        // Çekilen siparişleri state'e yerleştiriyoruz
        this.currentOrders = orders.filter(order => order.status === 'active');
        this.completedOrders = orders.filter(order => order.status === 'completed');
        this.historyOrders = orders.filter(order => order.status === 'history');
      } catch (error) {
        console.error('Siparişleri çekerken hata oluştu:', error.message);
      }
    },

    // Supabase'e sipariş ekleme
    async addOrderToSupabase(newOrder) {
      try {

      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder]);

      if (error) {
        console.error('Sipariş eklenirken hata oluştu:', error.message);
        return;
      }
      
      this.addOrder(data[0]); // Yerel store'a ekliyoruz
    } catch (error) {
      console.error('Sipariş eklenirken hata oluştu:', error.message);
    }
    },

    addOrder(order) {
      this.currentOrders.push(order);
    },

    // Complete an order and update both local state and Supabase
    async completeOrder(orderId) {
      const orderIndex = this.currentOrders.findIndex(o => o.id === orderId);
      if (orderIndex !== -1) {
        const order = this.currentOrders[orderIndex];
        order.status = 'completed';

        // Update in Supabase
        const { error } = await supabase
          .from('orders')
          .update({ status: 'completed' })
          .eq('id', orderId);

        if (error) {
          console.error('Error completing order:', error.message);
          return;
        }

        // Move order from currentOrders to completedOrders
        this.currentOrders.splice(orderIndex, 1);
        this.completedOrders.push(order);
      }
    },

    // Cancel an order
    async cancelOrder(orderId) {
      const orderIndex = this.currentOrders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        // Remove order from currentOrders
        const [canceledOrder] = this.currentOrders.splice(orderIndex, 1);

        // Optionally, update the status in Supabase if needed
        await supabase
          .from('orders')
          .update({ status: 'canceled' })
          .eq('id', orderId);
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


/* import { defineStore } from 'pinia';

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
 */
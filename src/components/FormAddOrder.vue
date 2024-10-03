<template>
  <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Yeni Sipariş Ekle</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Kapat</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-textarea class="custom-textarea" placeholder="Siparis" v-model="newOrder.name" @input="validateOrder" required></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-textarea class="custom-textarea" placeholder="Nereye" v-model="newOrder.details"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-textarea class="custom-textarea" placeholder="Notlar" v-model="newOrder.notes"></ion-textarea>
      </ion-item>

      <ion-button expand="full" @click="addNewOrder" :disabled="!canAddOrder">Ekle</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['closeForm', 'addOrder'],
  setup(props, { emit }) {
    const newOrder = ref({
      name: '',
      details: '',
      notes: '',
      date: null
    });
    const canAddOrder = ref(false);

    // Modal kapatıldığında formu sıfırla
    const closeModal = () => {
      emit('closeForm');
      newOrder.value = { name: '', details: '', notes: '', date: null }; // Formu temizle
      canAddOrder.value = false;
    };

    // Sipariş bilgilerini kontrol et
    const validateOrder = () => {
      canAddOrder.value = newOrder.value.name.length > 5;
    };

    // Yeni siparişi ekle
    const addNewOrder = () => {
      if (canAddOrder.value) {
        newOrder.value.date = new Date().toISOString();
        emit('addOrder', { ...newOrder.value, id: Date.now() });
        closeModal(); // Eklemeden sonra modalı kapat
      }
    };

    // isModalOpen değişikliğinde kontrol et
    watch(() => props.isModalOpen, (newVal) => {
      if (!newVal) {
        closeModal(); // Modal kapanıyorsa formu sıfırla
      }
    });

    return {
      newOrder,
      canAddOrder,
      closeModal,
      validateOrder,
      addNewOrder
    };
  }
};
</script>

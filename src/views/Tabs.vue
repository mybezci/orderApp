<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="orders" href="/tabs/orders">
          <ion-icon aria-hidden="true" :icon="cart" />
          <ion-label>Siparis</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="done" href="/tabs/done">
          <ion-icon aria-hidden="true" :icon="checkmark" />
          <ion-label>Tamamlanan</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="history" href="/tabs/history">
          <ion-icon aria-hidden="true" :icon="archive" />
          <ion-label>Gecmis</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label>Ayarlar</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { archive, cart, checkmark, settings } from 'ionicons/icons';
</script>

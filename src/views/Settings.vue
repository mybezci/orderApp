<template>
  <ion-page>

    <ion-content>
      <h2>Ayarlar</h2>
      <ion-item>
        <ion-label>Bildirimler</ion-label>
        <ion-toggle v-model="notificationsEnabled"></ion-toggle>
      </ion-item>
    </ion-content>
  </ion-page>

</template>

<script>
export default {
  data() {
    return {
      notificationsEnabled: true
    };
  }
};
</script>

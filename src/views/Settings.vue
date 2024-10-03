<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <h2>Ayarlar</h2>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-card style="margin-bottom: 1rem;">
 
          <ion-item>
            <ion-label>Username</ion-label>
            <ion-input slot="end" v-model="user.username"></ion-input>
          </ion-item> 
          <ion-item>
            <ion-label>User number</ion-label>
            <ion-input slot="end" v-model="user.usernumber"></ion-input>
          </ion-item> 
          <ion-item>
            <ion-label>Bildirimler</ion-label>
            <ion-toggle slot="end" v-model="notificationsEnabled"></ion-toggle>
          </ion-item> 
          <ion-item>
            <ion-label>Bildirimler</ion-label>
            <ion-toggle slot="end" v-model="notificationsEnabled"></ion-toggle>
          </ion-item> 
          <ion-item>
            <ion-label>Bildirimler</ion-label>
            <ion-toggle slot="end" v-model="notificationsEnabled"></ion-toggle>
          </ion-item>
        </ion-card>
    </ion-content>
  </ion-page>

</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const user = ref({
      username: 'user',
      usernumber: 0
    });

    const notificationsEnabled = ref(true);

    return {
      user,
      notificationsEnabled
    };
  }
};
</script>

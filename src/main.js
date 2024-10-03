import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';

import {
  IonicVue,
  IonButton,
  IonButtons, 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader, 
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonModal, 
  IonPage,
  IonRow,
  IonTextarea, 
  IonTitle, 
  IonToggle,
  IonToolbar, 
} from '@ionic/vue';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
/* Main CSS */
import './theme/styles.css';  // main.css dosyanızı buraya ekleyin

import PrimeVue from 'primevue/config';
import DataTable from "primevue/datatable"
import Column from "primevue/column"


const app = createApp(App)


app.component('IonButton', IonButton);
app.component('IonButtons', IonButtons);
app.component('IonCard', IonCard);
app.component('IonCardContent', IonCardContent);
app.component('IonCardHeader', IonCardHeader);
app.component('IonCardTitle', IonCardTitle);
app.component('IonCol', IonCol);
app.component('IonContent', IonContent);
app.component('IonFooter', IonFooter);
app.component('IonGrid', IonGrid);
app.component('IonHeader', IonHeader);
app.component('IonIcon', IonIcon);
app.component('IonInput', IonInput );
app.component('IonItem', IonItem);
app.component('IonItemOption', IonItemOption);
app.component('IonItemOptions', IonItemOptions);
app.component('IonItemSliding', IonItemSliding);
app.component('IonLabel', IonLabel);
app.component('IonModal', IonModal);
app.component('IonPage', IonPage);
app.component('IonRow', IonRow);
app.component('IonTextarea', IonTextarea);
app.component('IonTitle', IonTitle);
app.component('IonToggle', IonToggle);
app.component('IonToolbar', IonToolbar);



app.use(IonicVue)
app.use(createPinia())
app.use(router)

app.use(PrimeVue)
app.component('DataTable', DataTable);
app.component('Column', Column);


router.isReady().then(() => {
  app.mount('#app');
});

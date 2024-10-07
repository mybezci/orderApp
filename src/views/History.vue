<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Completed Orders</ion-title>
        <ion-buttons class="button-header" color="success" expand="full"  slot="end">
          <ion-button @click="exportToExcel">
            <ion-icon slot="icon-only" :icon="download"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <div class="datatable-container" v-if="historyOrders.length > 0">
        <DataTable :value="historyOrders" :filters="filters" :sortField="sortField" :sortOrder="sortOrder" class="p-datatable-gridlines">
          <Column field="id" header="No" sortable style="width: 10%" />
          <Column field="name" header="Order Name" sortable filter filterPlaceholder="Search by name" 
            filterMatchMode="contains"
            filterMenuStyle="width: 100%"
            style="width: 45%"/>
          <Column field="date" header="Date" sortable filter filterPlaceholder="Search by date" 
            filterMatchMode="contains"
            filterMenuStyle="width: 100%"
            style="width: 45%"/>
        </DataTable>
      </div>
      <div v-else>
        <p>No history orders found.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { download } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';
import { useOrderStore } from '../store/orders';


export default {
  setup() {

    const orderStore = useOrderStore();

    const historyOrders = ref([]);



    const filters = ref({
      name: { value: null, matchMode: 'contains' },
      date: { value: null, matchMode: 'contains' }
    });

    const sortField = ref(null);
    const sortOrder = ref(null);


    const loadHistoryOrders = async () => {
      historyOrders.value = orderStore.historyOrders; // varsayılan bir API veya methodu çağırarak alınabilir
    };

    onMounted(async() => {
      await loadHistoryOrders();

    });



    // Function to export the data to Excel
    const exportToExcel = () => {
      // Create a worksheet from the orders data
      const ws = XLSX.utils.json_to_sheet(orders.value);

      // Create a new workbook and append the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Orders');

      // Export the workbook to an Excel file
      XLSX.writeFile(wb, 'Completed_Orders.xlsx');

    }
    


    return {
        historyOrders,
        filters,
        sortField,
        sortOrder,
        exportToExcel,        
        download
      };
 
  }
};


</script>


<style scoped>
.datatable-container {
  padding: 1rem;
}

.p-datatable .p-datatable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p-paginator .p-paginator-current {
  margin-right: 1rem;
}

.button-header {
  display: flex;
  justify-content: space-between;
}

.button-header ion-button {
  font-size: 100px;
}
</style>

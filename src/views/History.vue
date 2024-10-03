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

      <div class="datatable-container">
        <DataTable :value="orders" :filters="filters" :sortField="sortField" :sortOrder="sortOrder" class="p-datatable-gridlines">
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
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { download } from 'ionicons/icons';
import { ref } from 'vue';
import * as XLSX from 'xlsx';

export default {
  setup() {

    const orders = ref([
      { id: 1, name: 'Order A', date: '2024-09-30' },
      { id: 2, name: 'Order B', date: '2024-10-01' },
      { id: 3, name: 'Order C', date: '2024-10-02' },
      { id: 4, name: 'Order D', date: '2024-10-03' },
      { id: 5, name: 'Order E', date: '2024-10-04' },
      // Daha fazla sipariş eklenebilir
    ]);

    const filters = ref({
      name: { value: null, matchMode: 'contains' },
      date: { value: null, matchMode: 'contains' }
    });

    const sortField = ref(null);
    const sortOrder = ref(null);


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
        orders,
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

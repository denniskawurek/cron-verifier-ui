import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Card from 'primevue/card';
import OverlayPanel from 'primevue/overlaypanel';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import Calendar from 'primevue/calendar';

import 'primevue/resources/themes/nova-vue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component('InputText', InputText);
app.component('Message', Message);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputNumber', InputNumber);
app.component('MultiSelect', MultiSelect);
app.component('Card', Card);
app.component('OverlayPanel', OverlayPanel);
app.component('Button', Button);
app.component('Listbox', Listbox);
app.component('Calendar', Calendar);
app.mount('#app');

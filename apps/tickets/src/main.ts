import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Row from 'primevue/row';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Timeline from 'primevue/timeline';
import Toolbar from 'primevue/toolbar';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.scss';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/index');
  (window as any).infosys = { user_id: 241 }; // to simulate what properties are available on Infosys
  worker.start({
    onUnhandledRequest(req) {
      console.info(`Unhandled ${req.method} request to ${req.url.href} `);
    }
  });
}

const app = createApp(App);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('Card', Card);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dropdown', Dropdown);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Menu', Menu);
app.component('Row', Row);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Timeline', Timeline);
app.component('Toolbar', Toolbar);
app.directive('tooltip', Tooltip);

app.use(router);
app.use(PrimeVue, { ripple: true });

app.mount('.content-container');

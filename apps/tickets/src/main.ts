import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.scss';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/index');
  worker.start();
}

const app = createApp(App);

app.use(router);

app.mount('.content-container');

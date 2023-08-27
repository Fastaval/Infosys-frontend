import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.scss';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/index');
  worker.start({
    onUnhandledRequest(req) {
      console.info(`Unhandled ${req.method} request to ${req.url.href} `);
    }
  });
}

const app = createApp(App);

app.use(router);

app.mount('.content-container');

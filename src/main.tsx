import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@styles/index.css';
import { Provider } from 'react-redux';
import { persistor, store } from '@redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);

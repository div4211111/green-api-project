import { combineReducers, configureStore } from '@reduxjs/toolkit';
import credentialsSlice from './credentials/credentialsSlice';
import { notificationMiddleware } from './middlewares/notificationMiddleware';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import chatSlice from './chat/chat.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['credentials'],
};

const reducers = combineReducers({
  credentials: credentialsSlice,
  chat: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(notificationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export let persistor = persistStore(store);

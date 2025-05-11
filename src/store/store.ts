
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './features/Authentification/AuthSlice';
import { usersReducer } from './features/users/usersSlice';
import { productsReducer } from './features/products/productsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'users', 'products']
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

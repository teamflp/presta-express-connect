// Configuration du store
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
//import usersReducer, {UsersAppState} from "./features/users/usersSlice"
//import productsReducer, {ProductsAppState} from "./features/products/productsSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from "./features/Authentification/AuthSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Exportation du store pour pouvoir l'utiliser dans l'application
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

// Définissez et exportez le type RootState
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export default store
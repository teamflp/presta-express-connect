import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { someAction, UsersAppState } from "../store/features/users/usersSlice";
import productsReducer, { fetchProductsFail, fetchProductsStart, fetchProductsSuccess, ProductsAppState } from "../store/features/products/productsSlice";
import authReducer, { loginSuccess, logout } from "../store/features/Authentification/AuthSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist/es/types";
import { PersistPartial } from "redux-persist/es/persistReducer";
import  {Products}  from "../store/features/products/productsSlice";


type RootState = {
  users: UsersAppState;
  products: ProductsAppState;
  auth: ReturnType<typeof authReducer> & PersistPartial;
};

const persistConfig: PersistConfig<ReturnType<typeof authReducer>> = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// -------------------------------- Test de la slice User ------------------------------------
describe("User test", () => {
  // ------------------ Test de l'état initial ----------------
  it("should have the correct initial state", () => {
    const initialState: RootState = store.getState();

    expect(initialState.users).toEqual({
        users: [],
        status: 'idle',
        error: null,
        loading: false,
        isAuthenticated: false,
        email: null,
        loginFailed: false,
    });

    expect(initialState.products).toEqual({
        products : [],
        loading : false,
        error : null,
    });

    expect(initialState.auth).toEqual({
        isAuthenticated: false,
    });
  });
  // ------------------------ test de someAction ---------------
  it('should handle someAction correctly', () => {
    const payload = {}

    store.dispatch(someAction(payload))

    const state: UsersAppState = store.getState().users

    expect(state.loading).toBe(false)
  })
})

// --------------------------------- Test de la slice product ----------------------------
describe("Test Products" , () => {
  // ------------ test fetchProductsStart --------------------------
  it("should handle fetchProductsStart correctly", () => {
    store.dispatch(fetchProductsStart())

    const state: ProductsAppState = store.getState().products

    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  // ----------------------- test fetchProductsSuccess ---------------------
  it("should handle fetchProductsSuccess correctly", () => {
    const products : Products[] = [
      {
        id: 1,
        name: "Product 1",
        description: "Description 1",
        price: 10.99,
        quantity: 10,
        createdAt: "2022-01-01T00:00:00Z",
        modifiedAt: "2022-01-01T00:00:00Z",
        latitude: 48.856614,
        longitude: 2.352222,
      },
    ]

    store.dispatch(fetchProductsSuccess(products))

    const state : ProductsAppState = store.getState().products

    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.products).toEqual(products)
  })

  // ------------------------- test fetchProductsFail --------------------------
  it("should handle fetchProductsFail correctly", () => {
    const errorMessage = "Error fetching products"

    store.dispatch(fetchProductsFail(errorMessage))

    const state : ProductsAppState = store.getState().products

    expect(state.loading).toBe(false)
    expect(state.error).toEqual(errorMessage)
    expect(state.products).toEqual([])
  })
})

// ---------------------------- test de la slice Auth -----------------------------
describe("test Auth", () => {
  // -------------------------- test de loginSuccess ----------------
  it("should handle loginSuccess correctly", () => {
    store.dispatch(loginSuccess())

    const state : RootState = store.getState()

    expect(state.auth.isAuthenticated).toBe(true)
  })


  // ---------------------- test de logout -------------
  it("sould handle logout correctly", () => {
    store.dispatch(logout())

    const state : RootState = store.getState()

    expect(state.auth.isAuthenticated).toBe(false)
  })
})

import { createSlice, PayloadAction, ThunkAction, AnyAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"

// Define AppThunk type directly here
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

// Définition de la structure de données pour les "products" (annonces)
export interface Products {
    id: number
    name: string
    description: string
    price: number 
    quantity: number
    createdAt: string
    modifiedAt: string
    latitude: number
    longitude: number
}

export interface ProductsAppState {
    products: Products[]
    loading: boolean
    error: string | null
}

// Définition de l'état initial
const initialState: ProductsAppState = {
    products: [],
    loading: false,
    error: null,
}

// Fonction utilitaire pour gérer l'état de chargement
const setLoading = (state: ProductsAppState, loading: boolean) => {
    state.loading = loading;
    if (loading) state.error = null;
};

// Fonction utilitaire pour gérer les erreurs
const setError = (state: ProductsAppState, error: string | null) => {
    state.error = error;
};

// Création de la slice
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        fetchProductsStart: (state) => {
            setLoading(state, true);
        },
        // Charge le tableau "Products" avec les products recus
        fetchProductsSuccess: (state, action: PayloadAction<Products[]>) => {
            setLoading(state, false);
            state.products = action.payload;
        },
        // Mets a jour l'"error" avec le message d'erreur 
        fetchProductsFail: (state, action: PayloadAction<string>) => {
            setLoading(state, false);
            setError(state, action.payload);
            state.products = []
        }
    }
})

export const {fetchProductsStart, fetchProductsSuccess, fetchProductsFail} = productsSlice.actions
export const productsReducer = productsSlice.reducer; // Export as named export for consistency
export default productsSlice.reducer

// Récupération des products depuis le back avec Thunk
// Remplacer le fetch avec le lien vers l'api BACK
export const fetchProducts = (): AppThunk => async (dispatch) => {
    dispatch(fetchProductsStart())
    try {
        const response = await fetch("/testStore/products.json")
        const data = await response.json()
        dispatch(fetchProductsSuccess(data))
    } catch(error) {
        dispatch(fetchProductsFail("Erreur lors du chargement des produits"))
    }
}

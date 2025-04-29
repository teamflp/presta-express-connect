import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess } from '../Authentification/AuthSlice';

// Définition de l'état initial
interface UserState {
    users: any[];
    status: string;
    error: any;
    loading: boolean;
    isAuthenticated: boolean;
    email: string | null;
    loginFailed: boolean;
}

const initialState: UserState = {
    users: [],
    status: 'idle',
    error: null,
    loading: false,
    isAuthenticated: false,
    email: null,
    loginFailed: false,
};

// Fonction utilitaire pour gérer l'état de chargement
const setLoading = (state: UserState, loading: boolean) => {
    state.loading = loading;
    if (loading) state.error = null;
};

// Fonction utilitaire pour gérer les erreurs
const setError = (state: UserState, error: any) => {
    state.error = error;
};

// Création de la fonction asynchrone getUsers
export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await fetch('/public/testStore/users.json');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
});

// Création de la fonction asynchrone userLogin
export const userLogin = createAsyncThunk('auth/userLogin', async ({ email, password }: { email: string, password: string }, { dispatch }) => {
    const response = await fetch('/public/testStore/users.json');
    const users = await response.json();

    const user = users.find((user: { email: string, password: string }) => user.email === email && user.password === password);

    if (user) {
        dispatch(loginSuccess());
        return { email: user.email };
    } else {
        throw new Error('Invalid credentials');
    }
});

// Création du slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        someAction: (state, action: PayloadAction<any>) => {
            setLoading(state, true);
            // autre logique
        setLoading(state, false);
        },
        anotherAction: (state, action: PayloadAction<any>) => {
        setLoading(state, false);
        setError(state, action.payload);
        },
        userLoginSuccess: (state, action: PayloadAction<{ email: string }>) => {
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.loginFailed = false;
        },
        loginFailure: (state) => {
        state.isAuthenticated = false;
        state.email = null;
        state.loginFailed = true;
        },
        fetchUsersStart(state) {
            setLoading(state, true);
        },
        fetchUsersSuccess(state, action: PayloadAction<string[]>) {
            setLoading(state, false);
            state.users = action.payload;
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            setLoading(state, false);
            setError(state, action.payload);
        },
        addUser(state, action: PayloadAction<string>) {
            state.users.push(action.payload);
        },
        removeUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter((user) => user !== action.payload);
        },
        checkAuth(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        userLogout(state) {
            state.isAuthenticated = false;
            state.email = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                setLoading(state, true);
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<string[]>) => {
                setLoading(state, false);
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                setLoading(state, false);
                setError(state, action.error.message || 'Failed to fetch users');
            })
            .addCase(userLogin.pending, (state) => {
                setLoading(state, true);
                state.loginFailed = false;
            })
            .addCase(userLogin.fulfilled, (state, action: PayloadAction<{ email: string } | null>) => {
                setLoading(state, false);
                if (action.payload) {
                    state.isAuthenticated = true;
                    state.email = action.payload.email;
                } else {
                    state.loginFailed = true;
                }
            })
            .addCase(userLogin.rejected, (state) => {
                setLoading(state, false);
                state.loginFailed = true;
            });
    },
});

// Exportation des actions et du reducer
export const {
    someAction, 
    anotherAction, 
    userLoginSuccess, 
    loginFailure,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    addUser,
    removeUser,
    checkAuth,
    userLogout,
} = usersSlice.actions;

export type UsersAppState = UserState;
export default usersSlice.reducer;

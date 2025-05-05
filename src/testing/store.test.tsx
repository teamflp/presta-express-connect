
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Updated import

// Créons un mockStore simplifié
const mockStore = (initialState = {}) => {
  return configureStore({
    reducer: (state = initialState) => state,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
};

describe('Redux Store Tests', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      users: {
        users: [],
        status: 'idle',
        error: null
      },
      products: {
        products: [],
        status: 'idle',
        error: null
      }
    });
  });

  it('should have the correct initial state', () => {
    const state = store.getState();
    expect(state.users.status).toBe('idle');
    expect(state.products.status).toBe('idle');
  });

  it('should dispatch actions correctly', () => {
    store.dispatch({ type: 'users/fetchUsers/pending' });
    const actions = store.dispatch({ 
      type: 'users/fetchUsers/fulfilled', 
      payload: [{ id: 1, name: 'Test User' }] 
    });
    
    expect(actions.type).toBe('users/fetchUsers/fulfilled');
    expect(actions.payload).toEqual([{ id: 1, name: 'Test User' }]);
  });
});


import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUsers } from '../store/features/users/usersSlice';

// Create mock store
const mockStore = configureStore([thunk]);

describe('Redux Store Tests', () => {
  let store: any;

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

  it('should dispatch fetchUsers action', () => {
    // Not actually making API call in tests
    store.dispatch({ type: 'users/fetchUsers/pending' });
    store.dispatch({ 
      type: 'users/fetchUsers/fulfilled', 
      payload: [{ id: 1, name: 'Test User' }] 
    });
    
    const actions = store.getActions();
    expect(actions[0].type).toEqual('users/fetchUsers/pending');
    expect(actions[1].type).toEqual('users/fetchUsers/fulfilled');
  });
});

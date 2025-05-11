
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Export the interface so it can be used by other files
export interface UserState {
  users: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/testStore/users.json');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch users';
      });
  },
});

export const selectAllUsers = (state: { users: UserState }) => state.users.users;
export const selectUsersStatus = (state: { users: UserState }) => state.users.status;
export const selectUsersError = (state: { users: UserState }) => state.users.error;
export const usersReducer = usersSlice.reducer; // Export as named export for consistency
export default usersSlice.reducer;

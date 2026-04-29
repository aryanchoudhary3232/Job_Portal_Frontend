import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  role: 'student' | 'recruiter' | 'staff';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Mock async thunk to simulate eventually speaking to the API Gateway
export const mockLoginToGateway = createAsyncThunk(
  'auth/mockLogin',
  async (credentials: { role: 'student' | 'recruiter' | 'staff' }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `Mock ${credentials.role.charAt(0).toUpperCase() + credentials.role.slice(1)}`,
      role: credentials.role,
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mockLoginToGateway.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(mockLoginToGateway.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(mockLoginToGateway.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

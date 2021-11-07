import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
  message: ''
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    connected: (state) => {
      state.connected = true
    },
    disconnected: (state) => {
      state.connected = false
    },
  }
});

export const selectWS = (state) => state.ws

export const { connected, disconnected } = wsSlice.actions;

export default wsSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false, // initial status of websocket it's disconnected
  message: ''
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    connected: (state) => {
      state.connected = true; // update state of the connection to be 'connected'
    },
    disconnected: (state) => {
      state.connected = false; // update state of the connection to be 'disconnected'
    },
  }
});

export const selectWS = (state) => state.ws;

export const { connected, disconnected } = wsSlice.actions;

export default wsSlice.reducer;
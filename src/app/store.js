import { configureStore } from '@reduxjs/toolkit';
import rankListReducer from '../features/rank/rankListSlice';
import wsReducer from '../features/websocket/websocketSlice'

export const store = configureStore({
  reducer: {
    ws: wsReducer, // websocket status state store
    rankList: rankListReducer // game players score ranking
  },
});

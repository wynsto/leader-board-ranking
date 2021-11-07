import { createSlice } from '@reduxjs/toolkit';

// initial state of rank list store
const initialState = {
  list: [], // player's score list [{score, username, id}]
  current: null,
  mode: 'gamer' // mode: gamer/admin    gamer: read only, admin: can add & update player's core
};

export const rankListSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    // update all the players ranking list
    updateList: (state, action) => {
      state.list = action.payload.list
    },
    // get players rank detail by id
    updateDetail: (state, action) => {
      state.current = action.payload.rankInfo;
    },
    // update mode, admin mode can update player score, otherwise it's read only mode
    updateMode: (state, action) => {
      state.mode = action.payload.mode;
    }
  }
});

export const { updateList, updateDetail, updateMode } = rankListSlice.actions;

export const selectRankList = (state) => {
  return state.rankList;
}
export default rankListSlice.reducer;

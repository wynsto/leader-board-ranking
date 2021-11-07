import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  current: null,
  mode: 'gamer'
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
      state.current = action.payload.rankInfo
    },
    // update mode, admin mode can update player score, otherwise it's read only mode
    updateMode: (state, action) => {
      state.mode = action.payload.mode
    }
  }
});

export const { updateList, updateDetail, updateMode } = rankListSlice.actions;

export const selectRankList = (state) => {
  return state.rankList;
}
export default rankListSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const myListSlice = createSlice({
  initialState: {
    watchingList: [],
    planToWatchList: [],
    watchedList: [],
    favoriteList: [],
    badList: [],
  },
  name: "myListSlice",
  reducers: {
    addToWatchingList: (state, action) => {
      state.watchingList.push(action.payload);
    },
    addTPlanToWatchList: (state, action) => {
      state.planToWatchList.push(action.payload);
    },
    addToWatchedList: (state, action) => {
      state.watchedList.push(action.payload);
    },
    addToFavoriteList: (state, action) => {
      state.favoriteList.push(action.payload);
    },
    addToBadList: (state, action) => {
      state.badList.push(action.payload);
    },
  },
});
export const {
  addToWatchingList,
  addTPlanToWatchList,
  addToWatchedList,
  addToFavoriteList,
  addToBadList,
} = myListSlice.actions;
export default myListSlice.reducer;

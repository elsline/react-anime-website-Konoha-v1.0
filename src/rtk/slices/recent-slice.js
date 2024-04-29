import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosGet = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});

export const fetchRecentEps = createAsyncThunk(
  "recentSlice/fetchRecentEps",
  async (url) => {
    const res = await axiosGet.get(url);
    return res.data;
  }
);
const recentSlice = createSlice({
  initialState: {
    getRecentEps: [],
  },
  name: "recentSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecentEps.fulfilled, (state, action) => {
      state.getRecentEps = action.payload;
    });
  },
});
export default recentSlice.reducer;

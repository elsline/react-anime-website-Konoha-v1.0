import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});

export const fetchRandomCharacter = createAsyncThunk(
  "animeRandomCharacter/fetchRandomCharacter",
  async (url) => {
    const res = await axiosInstance.get(url);
    return res.data;
  }
);

const animeRandomCharacter = createSlice({
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  name: "animeRandomCharacter",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRandomCharacter.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default animeRandomCharacter.reducer;

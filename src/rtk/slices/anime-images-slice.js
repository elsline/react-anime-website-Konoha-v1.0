import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosGet = axios.create({
  baseURL: "https://pic.re/",
});
export const fetchSearchForImage = createAsyncThunk(
  "animeImagesSlice/fetchSearchForImage",
  async (url) => {
    const res = await axiosGet.get(url);
    return res.data;
  }
);
export const fetchGetImagesTags = createAsyncThunk(
  "animeImagesSlice/fetchGetImagesTags",
  async (url) => {
    const res = await axiosGet.get(url);
    return res.data;
  }
);
export const fetchGetImagesCharacter = createAsyncThunk(
  "animeImagesSlice/fetchGetImagesCharacter",
  async (url) => {
    const res = await axiosGet.get(url);
    return res.data;
  }
);
export const fetchGetRandomImageFile = createAsyncThunk(
  "animeImagesSlice/fetchGetRandomImageFile",
  async (url) => {
    const res = await axiosGet.get(url);
    return res.data;
  }
);

const animeImagesSlice = createSlice({
  initialState: {
    searchForImage: [],
    getImagesTags: [],
    getImagesCharacter: [],
    getRandomImageFile: [],
  },
  name: "animeImagesSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetRandomImageFile.fulfilled, (state, action) => {
      state.getRandomImageFile = action.payload;
    });
  },
});
export default animeImagesSlice.reducer;

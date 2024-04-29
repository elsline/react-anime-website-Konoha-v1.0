import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "",
});
export const fetchAnimeList = createAsyncThunk(
  "animeListSlice/fetchAnimeList",
  async (url, bulletID) => {
    const maxRetries = 3;
    const initialDelay = 1000; // 1000ms = 1 second
    let delay = initialDelay;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axiosInstance.get(url);
        return response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw error;
        }
      }
    }
  }
);
export const fetchTopAnime = createAsyncThunk(
  "animeTopSlice/fetchTopAnime",
  async () => {
    const maxRetries = 3;
    const initialDelay = 1000; // 1000ms = 1 second
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axiosInstance.get("top/anime");
        return response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw error;
        }
      }
    }

    throw new Error("Max retries reached");
  }
);

export const animeListSlice = createSlice({
  initialState: {
    data: [],
  },
  name: "animeListSlice",
  reducers: {
    clearAnimee: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnimeList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { clearAnimee } = animeListSlice.actions;
export default animeListSlice.reducer;

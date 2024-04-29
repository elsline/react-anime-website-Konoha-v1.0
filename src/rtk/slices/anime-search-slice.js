import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `https://api.jikan.moe/v4/`,
});
export const fetchAnimeSearch = createAsyncThunk(
  "animeSearchSlice/fetchAnimeList",

  async (url) => {
    const maxRetries = 3;
    const initialDelay = 1000; // 1000ms = 1 second
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axiosInstance.get(url);
        return response.data;
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

  // async (url) => {
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   return data;
  // }
);

const animeSearchSlice = createSlice({
  initialState: [],
  name: "animeSearchSlice",
  reducers: {
    clearAnime: (state) => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnimeSearch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { clearAnime } = animeSearchSlice.actions;
export default animeSearchSlice.reducer;

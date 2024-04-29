import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});

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

const animeTopSlice = createSlice({
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  name: "animeTopSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopAnime.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default animeTopSlice.reducer;

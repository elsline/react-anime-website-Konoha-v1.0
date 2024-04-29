import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `https://api.jikan.moe/v4/`,
});

export const fetchAnimeSeason = createAsyncThunk(
  "animeSeasonSlice/fetchAnimeSeason",

  async (url) => {
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

    throw new Error("Max retries reached");
  }
);

const animeSeasonSlice = createSlice({
  initialState: {
    data: [],
  },
  name: "animeSeasonSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnimeSeason.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const {} = animeSeasonSlice.actions;
export default animeSeasonSlice.reducer;

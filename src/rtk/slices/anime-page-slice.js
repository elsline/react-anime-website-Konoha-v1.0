import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});

export const fetchAnimePage = createAsyncThunk(
  "animePageSlice/fetchAnimePage",
  async (animeID) => {
    const maxRetries = 3;
    const initialDelay = 1000; // 1000ms = 1 second
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axiosInstance.get(`anime/${animeID}`);
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
  // async (animeID) => {
  //   const response = await axiosInstance.get(`anime/${animeID}`);
  //   return response.data;
  // }
);

export const fetchCharacters = createAsyncThunk(
  "animePageSlice/fetchCharacters",
  async (animeID) => {
    const maxRetries = 3;
    const initialDelay = 1000; // 1000ms = 1 second
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axiosInstance.get(`anime/${animeID}/characters`);
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
  // async (animeID) => {
  //   const response = await axiosInstance.get(`anime/${animeID}/characters`);
  //   return response.data;
  // }
);

export const fetchEpisodes = createAsyncThunk(
  "animePageSlice/fetchEpisodes",
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
  //   const response = await axiosInstance.get(url);
  //   return response.data;
  // }
);

const animePageSlice = createSlice({
  name: "animePageSlice",
  initialState: {
    animeData: [],
    charactersData: [],
    episodesData: [],
  },
  reducers: {
    clearAnime: (state) => {
      state.animeData = [];
    },
    clearAnimeData: (state) => {
      state.animeData = [];
    },
    clearCharactersData: (state) => {
      state.charactersData = [];
    },
    clearEpisodesData: (state) => {
      state.episodesData.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimePage.fulfilled, (state, action) => {
        state.animeData = action.payload;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.charactersData = action.payload;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.episodesData = action.payload;
      });
  },
});

export const {
  clearAnime,
  clearEpisodesData,
  clearCharactersData,
  clearAnimeData,
} = animePageSlice.actions;

export default animePageSlice.reducer;

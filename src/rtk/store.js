import { configureStore } from "@reduxjs/toolkit";
import animeListSlice from "./slices/anime-list-slice";
import animeSearchSlice from "./slices/anime-search-slice";
import animePageSlice from "./slices/anime-page-slice";
import animeSeasonsSlice from "./slices/anime-seasons-slice";
import animeTopSlice from "./slices/anime-top-slice";
import animeRecomSlice from "./slices/anime-recom-slice";
import animeUpcomingSlice from "./slices/anime-upcoming-slice";
import animeRandomCharacter from "./slices/anime-character-slice";
import animeImagesSlice from "./slices/anime-images-slice";
import recentSlice from "./slices/recent-slice";
import myListSlice from "./slices/my-list-slice";

export const store = configureStore({
  reducer: {
    animeList: animeListSlice,
    animeSearch: animeSearchSlice,
    animePage: animePageSlice,
    animeSeasons: animeSeasonsSlice,
    topAnime: animeTopSlice,
    animeRecom: animeRecomSlice,
    animeUpcoming: animeUpcomingSlice,
    animeCharacter: animeRandomCharacter,
    animeImages: animeImagesSlice,
    recentEps: recentSlice,
    myListSli: myListSlice,
  },
});

import React from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import Home from "../pages/Home";
import Tv from "../pages/Tv";
import RecentEpisodes from "../pages/RecentEpisodes";
import Search from "../pages/Search";
import Anime from "../pages/Anime";
import User from "../pages/User";
import AnimeList from "../pages/AnimeList";
import AnimeListPO from "../pages/AnimeListPO";
import AnimeListAR from "../pages/AnimeListAR";
import AnimeListFO from "../pages/AnimeListFO";
import About from "../pages/About";

function Router() {
  const location = useLocation();
  const MainPagesRoute = () => {
    return (
      <>
        <AppNavbar />
        <Outlet />
        <Footer class="main-bg-2" />
      </>
    );
  };
  const AnimeListRoute = () => {
    return (
      <>
        <AppNavbar />
        <Outlet />
        <Footer class="main-bg-1" />
      </>
    );
  };
  const AboutRoute = () => {
    return (
      <>
        <AppNavbar />
        <Outlet />
      </>
    );
  };
  return (
    <div>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<MainPagesRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/recent" element={<RecentEpisodes />} />
          <Route path="/search" element={<Search />} />
          <Route path="/anime/:animeID" element={<Anime />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/" element={<AnimeListRoute />}>
          <Route path="/animelist/top/:bulletID" element={<AnimeList />} />
          <Route
            path="/animelist/popular/:bulletID"
            element={<AnimeListPO />}
          />
          <Route path="/animelist/airing/:bulletID" element={<AnimeListAR />} />
          <Route
            path="/animelist/favorite/:bulletID"
            element={<AnimeListFO />}
          />
          <Route path="/anime/:animeID" element={<Anime />} />
        </Route>
        <Route path="/" element={<AboutRoute />}>
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Router;

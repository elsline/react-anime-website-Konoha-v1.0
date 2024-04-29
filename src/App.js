import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AppNavbar from "./components/AppNavbar";
import RecentEpisodes from "./pages/RecentEpisodes";
import About from "./pages/About";
import Search from "./pages/Search";
import Anime from "./pages/Anime";
import AnimeList from "./pages/AnimeList";
import AnimeListPO from "./pages/AnimeListPO";
import AnimeListFO from "./pages/AnimeListFO";
import AnimeListAR from "./pages/AnimeListAR";
import Tv from "./pages/Tv";
import { SkeletonTheme } from "react-loading-skeleton";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import User from "./pages/User";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  // const lenis = useLenis(({ scroll }) => {
  //   // called every scroll
  //   console.log("Scroll position:", scroll * 10);
  // });

  const location = useLocation();
  return (
    <div className="App">
      <SkeletonTheme baseColor="#252525" highlightColor="#525252">
        <AppNavbar />
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/animelist" element={<AnimeList />} />
            <Route path="/animelist/top/:bulletID" element={<AnimeList />} />
            <Route
              path="/animelist/popular/:bulletID"
              element={<AnimeListPO />}
            />
            <Route
              path="/animelist/airing/:bulletID"
              element={<AnimeListAR />}
            />
            <Route
              path="/animelist/favorite/:bulletID"
              element={<AnimeListFO />}
            />
            <Route path="/recent" element={<RecentEpisodes />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/anime/:animeID" element={<Anime />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </AnimatePresence>
      </SkeletonTheme>
      <ScrollToTop />
    </div>
  );
}

export default App;

import React from "react";
import MainSlider from "../components/MainSlider";
import AnimeSlider from "../components/AnimeSlider";
import AnimeSlider2 from "../components/AnimeSlider2";
import AnimeUpcoming from "../components/AnimeUpcoming";
import AnimeRandom from "../components/AnimeRandom";
import Footer from "../components/Footer";
import Transition from "../components/Transition";
function Home() {
  return (
    <Transition>
      <main>
        <div className="mainDiv  ">
          <MainSlider />
          <AnimeSlider />
          <AnimeSlider2 />
          <AnimeUpcoming />
          <AnimeRandom />
          <Footer class="main-bg-2" />
        </div>
      </main>
    </Transition>
  );
}

export default Home;

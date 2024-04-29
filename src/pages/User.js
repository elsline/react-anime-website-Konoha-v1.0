import React from "react";
import { Link } from "react-router-dom";
import img from "../imgs/profile.jpg";
import Transition from "../components/Transition";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

function User() {
  // Hooks
  const watching = useSelector((state) => state.myListSli.watchingList);
  const planToWatch = useSelector((state) => state.myListSli.planToWatchList);
  const watched = useSelector((state) => state.myListSli.watchedList);
  const favorite = useSelector((state) => state.myListSli.favoriteList);
  const bad = useSelector((state) => state.myListSli.badList);
  // Hooks
  return (
    <Transition>
      <section className="user-page">
        <div className="container">
          <span className="fs-1 fw-medium text-uppercase text-center w-100 d-block mb-4 ">
            my <span className="main-color">List</span>
          </span>
          <span className=" slider-title  fs-4 text-uppercase  border-bottom  border-2 border-main-color w-fit">
            watching
          </span>
          <div className="watching row mt-4">
            {watching.map((anime) => {
              return (
                <>
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    className=" text-decoration-none text-light col-lg-2 col-md-4 col-sm-6 col-6 "
                  >
                    <div className="anime-card  d-flex  flex-column ">
                      <img src={anime.images.jpg.image_url} alt=""></img>
                      <span className="fs-5">{anime.title}</span>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
          <span className=" slider-title  fs-4 text-uppercase  border-bottom  border-2 border-main-color w-fit">
            Plan to watch
          </span>
          <div className=" planToWatch row mt-4">
            {planToWatch.map((anime) => {
              return (
                <>
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    className=" text-decoration-none text-light col-lg-2 col-md-4 col-sm-6 col-6"
                  >
                    <div className="anime-card  d-flex  flex-column ">
                      <img src={anime.images.jpg.image_url} alt=""></img>
                      <span className="fs-5">{anime.title}</span>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
          <span className=" slider-title  fs-4 text-uppercase  border-bottom  border-2 border-main-color w-fit">
            watched
          </span>
          <div className=" watched row mt-4">
            {watched.map((anime) => {
              return (
                <>
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    className=" text-decoration-none text-light col-lg-2 col-md-4 col-sm-6 col-6 "
                  >
                    <div className="anime-card  d-flex  flex-column ">
                      <img src={anime.images.jpg.image_url} alt=""></img>
                      <span className="fs-5">{anime.title}</span>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
          <span className=" slider-title  fs-4 text-uppercase  border-bottom  border-2 border-main-color w-fit">
            Favorite
          </span>
          <div className="favorite row mt-4">
            {favorite.map((anime) => {
              return (
                <>
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    className=" text-decoration-none text-light col-lg-2 col-md-4 col-sm-6 col-6 "
                  >
                    <div className="anime-card  d-flex  flex-column ">
                      <img src={anime.images.jpg.image_url} alt=""></img>
                      <span className="fs-5">{anime.title}</span>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
          <span className=" slider-title  fs-4 text-uppercase  border-bottom  border-2 border-main-color w-fit">
            bad
          </span>
          <div className="bad row mt-4">
            {bad.map((anime) => {
              return (
                <>
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    className=" text-decoration-none text-light col-lg-2 col-md-4 col-sm-6 col-6 "
                  >
                    <div className="anime-card  d-flex  flex-column ">
                      <img src={anime.images.jpg.image_url} alt=""></img>
                      <span className="fs-5">{anime.title}</span>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </section>
      <Footer className="main-bg-2" />
    </Transition>
  );
}

export default User;

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimeSeason } from "../rtk/slices/anime-seasons-slice";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SkeletonMainSlide from "./SkeletonMainSlide";
import {
  addTPlanToWatchList,
  addToBadList,
  addToFavoriteList,
  addToWatchedList,
  addToWatchingList,
} from "../rtk/slices/my-list-slice";

function MainSlider() {
  // Hooks
  const dispatch = useDispatch();
  const animeSeasons = useSelector((state) => state.animeSeasons.data);
  const add = useRef(null);
  useEffect(() => {
    dispatch(fetchAnimeSeason("seasons/now?q&limit=14"));
  }, [dispatch]);
  // Hooks
  if (!animeSeasons) {
    return <SkeletonMainSlide />;
  }

  // Events
  const addToList = (anime) => {
    return (
      <div className="addToListCard" ref={add}>
        <span className="closeIcon position-absolute" onClick={handelCloseIcon}>
          <i className="fa-solid fa-xmark fs-2"></i>
        </span>
        <ul>
          <li onClick={() => handelLiClick(addToWatchingList(anime))}>
            <i className="fa-regular fa-eye"></i>
            watching
          </li>
          <li onClick={() => handelLiClick(addTPlanToWatchList(anime))}>
            <i className="fa-solid fa-list-check"></i>
            Plan to watch
          </li>
          <li onClick={() => handelLiClick(addToWatchedList(anime))}>
            <i className="fa-regular fa-circle-check"></i>
            watched
          </li>
          <li onClick={() => handelLiClick(addToFavoriteList(anime))}>
            <i className="fa-solid fa-heart"></i>
            Favorite
          </li>
          <li onClick={() => handelLiClick(addToBadList(anime))}>
            <i className="fa-regular fa-thumbs-down"></i>
            bad
          </li>
        </ul>
      </div>
    );
  };
  const handleClick = () => {
    gsap.to(".addToListCard", {
      opacity: 1,
      display: "block",
      onComplete: () => {},
    });
  };
  const handelLiClick = (action) => {
    dispatch(action);
    gsap.to(".addToListCard", {
      opacity: 0,
      display: "none",
    });
  };
  const handelCloseIcon = () => {
    gsap.to(".addToListCard", {
      opacity: 0,
      display: "none",
    });
  };
  // Events
  const anime =
    animeSeasons &&
    animeSeasons.map((season) => (
      <SwiperSlide key={season.mal_id}>
        <div
          className="main-slide"
          style={{
            backgroundImage: `url(${season.trailer.images.maximum_image_url})`,
          }}
        >
          <div className="overllay"></div>
          <div className="main-card  container ">
            <span className="hash fs-4"> This Season</span>
            <h1 className="   ">{season.title}</h1>
            <div className="tags">
              <div className="sub">
                <span>{season.broadcast.day}</span>
                <span className="fk">4k</span>
                <span>dub</span>
                <span>sub</span>
                <span className="tv">{season.type}</span>
              </div>
              <div className="epsInfo">
                <span className="latestEP">
                  {season.episodes == null
                    ? "continuous"
                    : `Ep ${season.episodes}`}
                </span>
                <span className="epTime">
                  {season.duration === "Unknown"
                    ? "24m"
                    : `${season.duration.substring(0, 2)}m`}
                </span>
              </div>
            </div>
            <p className="description">{season.synopsis}</p>
            <div className="main-btns">
              <Link to={`anime/${season.mal_id}`} className="wn ">
                <i className="fa-solid fa-play"></i>
                <span>watch now</span>
              </Link>
              <button className="atl position-relative">
                <i className="fa-solid fa-plus"></i>
                {addToList(season)}
                <span
                  className=" position-relative"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  add to list
                </span>
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="mainSlider">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={false}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        loop={true} // Enable loop
        autoplay={{ delay: 5000, reverseDirection: true }} // Enable autoslide with a delay of 2000ms (2 seconds)
        className="mySwiper"
      >
        {anime}
      </Swiper>
    </div>
  );
}

export default MainSlider;

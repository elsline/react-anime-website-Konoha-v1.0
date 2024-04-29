import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import {
  clearRecommendationAnime,
  fetchRecommendationAnime,
} from "../rtk/slices/anime-recom-slice";
import SkeletonSlider from "./SkeletonSlider";
import { PlaceholderImg } from "../pages/Anime";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function AnimeSlider2() {
  // Hooks
  const dispatch = useDispatch();
  const recomAnime = useSelector((state) => state.animeRecom.data);
  const [url, setUrl] = useState("bypopularity");
  const [activeIndex, setActiveIndex] = useState(0); // Set initial active index to 0
  const [activeFilter, setActiveFilter] = useState(""); // State to store the active filter
  const [most, setMost] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchRecommendationAnime(`top/anime?filter=${url}`)).then(() => {
      setIsLoading(false);
    });
  }, [url, dispatch]);
  // Hooks

  //Events
  const handleMost = (item) => {
    setMost(item);
  };
  const handleItemClick = (index, filter) => {
    setActiveIndex(index);
    setActiveFilter(filter);
  };
  const handleUrl = (filter) => {
    if (filter === "popular") {
      dispatch(fetchRecommendationAnime(`top/anime?filter=bypopularity`));
    } else {
      setUrl(filter);

      dispatch(clearRecommendationAnime());
      setIsLoading(true);
      dispatch(
        fetchRecommendationAnime(`top/anime?filter=${filter}&sfw=true`)
      ).then(() => {
        setIsLoading(false);
      });
    }
  };
  //Events
  let i = 443;
  // Responsive components
  const LgSwiper = () => {
    return (
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        freeMode={false}
        pagination={false}
        modules={[FreeMode, Pagination]}
        className="mySwiper mt-4 pt-1"
      >
        {isLoading && (
          <div className="row">
            <SkeletonSlider cards={6} cols={"col-2"} />
          </div>
        )}
        {recomAnime &&
          recomAnime.map((anime) => (
            <SwiperSlide key={anime.mal_id + i++}>
              <Link className="" to={`/anime/${anime.mal_id}`}>
                <div className="anime-card ">
                  <div className="imgHolder">
                    <img
                      src={
                        anime.images.jpg.image_url === null
                          ? PlaceholderImg
                          : anime.images.jpg.image_url
                      }
                      alt=""
                    ></img>
                  </div>
                  <span>{anime.title}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  };
  const MdSwiper = () => {
    return (
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        freeMode={false}
        pagination={false}
        modules={[FreeMode, Pagination]}
        className="mySwiper mt-4 pt-1"
      >
        {isLoading && (
          <div className="row">
            <SkeletonSlider cards={4} cols={"col-3"} />
          </div>
        )}
        {recomAnime &&
          recomAnime.map((anime) => (
            <SwiperSlide key={anime.mal_id + i++}>
              <Link className="" to={`/anime/${anime.mal_id}`}>
                <div className="anime-card ">
                  <div className="imgHolder">
                    <img
                      src={
                        anime.images.jpg.image_url === null
                          ? PlaceholderImg
                          : anime.images.jpg.image_url
                      }
                      alt=""
                    ></img>
                  </div>
                  <span>{anime.title}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  };
  const SmSwiper = () => {
    return (
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        freeMode={false}
        pagination={false}
        modules={[FreeMode, Pagination]}
        className="mySwiper mt-4 pt-1"
      >
        {isLoading && (
          <div className="row">
            <SkeletonSlider cards={2} cols={"col-6"} />
          </div>
        )}
        {recomAnime &&
          recomAnime.map((anime) => (
            <SwiperSlide key={anime.mal_id + i++}>
              <Link className="" to={`/anime/${anime.mal_id}`}>
                <div className="anime-card ">
                  <div className="imgHolder">
                    <img
                      src={
                        anime.images.jpg.image_url === null
                          ? PlaceholderImg
                          : anime.images.jpg.image_url
                      }
                      alt=""
                    ></img>
                  </div>
                  <span>{anime.title}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  };
  const isSmallScreen = window.innerWidth <= 768;
  const isMedScreen = window.innerWidth <= 992;
  // Responsive components
  return (
    <section className=" main-bg-2 py-5 ">
      <div className="animeSlide container ">
        <ul className="filter d-flex justify-content-center align-items-center text-uppercase fs-5 mb-0">
          {["popular", "airing", "favorite"].map((item, index) => (
            <li
              key={index}
              className={index === activeIndex ? "active" : ""}
              onClick={() => {
                handleItemClick(index, item);
                handleUrl(item);
                handleMost(item);
              }}
            >
              {item === activeFilter ? item : item}
            </li>
          ))}
        </ul>
        <div className="slider-links d-flex justify-content-between align-items-center">
          <span className="slider-title fs-4 text-uppercase  border-bottom  border-2 border-main-color">
            Most {most}
          </span>
          <Link
            to={`animelist/${most}/1`}
            className="view-more fs-6   text-uppercase "
          >
            view more
          </Link>
        </div>
        {isSmallScreen ? (
          <SmSwiper />
        ) : isMedScreen ? (
          <MdSwiper />
        ) : (
          <LgSwiper />
        )}
      </div>
    </section>
  );
}

export default AnimeSlider2;

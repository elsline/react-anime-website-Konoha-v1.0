import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopAnime } from "../rtk/slices/anime-top-slice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { PlaceholderImg } from "../pages/Anime";
import SkeletonSlider from "./SkeletonSlider";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function AnimeSlider() {
  // Hooks
  const dispatch = useDispatch();
  const topAnime = useSelector((state) => state.topAnime.data);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchTopAnime()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  // Hooks

  let i = 454;
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
        {topAnime &&
          topAnime.map((anime) => (
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
        {topAnime &&
          topAnime.map((anime) => (
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
        {topAnime &&
          topAnime.map((anime) => (
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
    <section className="py-5">
      <div className="animeSlide container">
        <div className="slider-links d-flex justify-content-between align-items-center">
          <span className="slider-title fs-4 text-uppercase  border-bottom  border-2 border-main-color">
            Top Anime
          </span>
          <Link
            to={"animelist/top/1"}
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

export default AnimeSlider;

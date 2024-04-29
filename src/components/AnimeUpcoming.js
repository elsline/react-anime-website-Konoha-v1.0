import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingAnime } from "../rtk/slices/anime-upcoming-slice";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SkeletonUpcoming from "./SkeletonUpcoming";
import "swiper/css";
import "swiper/css/navigation";

function AnimeUpcoming() {
  // Hooks
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const animeUP = useSelector((state) => state.animeUpcoming.data);
  useEffect(() => {
    dispatch(fetchUpcomingAnime()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  // Hooks
  let i = 57658;
  const upAnime = animeUP.map((anime) => (
    <SwiperSlide key={anime.mal_id + i++}>
      <div className="showAnime row ">
        <Col xs="12" md="12" lg="8">
          <div className="imgHolder">
            <img
              className="w-100 "
              alt=""
              src={
                anime.trailer.images.maximum_image_url
                  ? anime.trailer.images.maximum_image_url
                  : anime.trailer.images.large_image_url
              }
            />
          </div>
        </Col>
        <Col xs="12" md="12" lg="4">
          <div className="main-card ashow p-0">
            <h1 className="mb-3 h-111 fs-70">{anime.title}</h1>
            <span className="season fs-4 text-uppercase fw-medium ">
              {anime.season === null ? "2025" : ` ${anime.season}, 2024`}
            </span>
            <p className="description fs-16 mt-3 h-111">{anime.synopsis}</p>
            <div className="main-btns">
              <Link target="_blank" className="wn " to={anime.trailer.url}>
                <i className="fa-brands fa-youtube"></i>
                <span>watch trailer</span>
              </Link>
              <Link to={`/anime/${anime.mal_id}`} className="atl">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span>more info</span>
              </Link>
            </div>
          </div>
        </Col>
      </div>
    </SwiperSlide>
  ));
  return (
    <section>
      <div className="container showSwiper ">
        <span className="fs-2 fw-medium text-uppercase text-center w-100 d-block mt-5  ">
          Upcoming <span className="main-color">Anime</span>
        </span>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {isLoading && <SkeletonUpcoming />}
          {upAnime}
        </Swiper>
      </div>
    </section>
  );
}

export default AnimeUpcoming;

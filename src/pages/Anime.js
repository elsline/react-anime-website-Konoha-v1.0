import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  clearAnime,
  clearCharactersData,
  clearEpisodesData,
  fetchAnimePage,
  fetchCharacters,
  fetchEpisodes,
} from "../rtk/slices/anime-page-slice";
import { Link, useParams } from "react-router-dom";
import SkeletonEps from "../components/SkeletonEps";
import SkeletonCh from "../components/SkeletonCh";
import Transition from "../components/Transition";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkeletonAnime from "../components/SkeletonAnime";
import Footer from "../components/Footer";
import {
  addTPlanToWatchList,
  addToBadList,
  addToFavoriteList,
  addToWatchedList,
  addToWatchingList,
} from "../rtk/slices/my-list-slice";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export const PlaceholderImg = "https://placehold.jp/363636/363636/150x150.png";

function Anime() {
  // Hooks
  const { animeID } = useParams();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const anime = useSelector((state) => state.animePage.animeData.data);
  const characters = useSelector(
    (state) => state.animePage.charactersData.data
  );
  const episode = useSelector((state) => state.animePage.episodesData.data);
  const episodePa = useSelector(
    (state) => state.animePage.episodesData.pagination
  );

  useEffect(() => {
    dispatch(fetchAnimePage(animeID)).then(() => {
      setIsLoading(false);
    });
    dispatch(fetchCharacters(animeID));
    dispatch(
      fetchEpisodes(
        `https://api.jikan.moe/v4/anime/${animeID}/videos/episodes?page=${page}`
      )
    );
  }, [animeID, dispatch]);

  // Hooks
  if (!anime || !episode || !characters) {
    return <SkeletonAnime />;
  }
  const topCharacters = characters.slice(0, 10);
  const character = topCharacters.map((character, index) => (
    <div
      key={index}
      className="imgCard d-flex flex-column gap-1 align-items-center"
    >
      <img alt="" src={character.character.images.jpg.image_url}></img>
    </div>
  ));

  const episodes = episode.map((ep) => (
    <a
      key={ep.mal_id}
      href={ep.url}
      target="_blank"
      rel="noreferrer"
      className="epCard   curs-p col-lg-2  col-6 d-flex flex-column text-decoration-none text-light"
    >
      <i className="fa-regular fa-circle-play"></i>
      <img
        alt=""
        src={
          ep.images.jpg.image_url === null
            ? PlaceholderImg
            : ep.images.jpg.image_url
        }
      ></img>
      <span className="fw-medium text-uppercase pt-2">{ep.episode}</span>
    </a>
  ));
  const {
    title_japanese,
    title,
    images,
    aired,
    duration,
    season,
    year,
    score,
    status,
    mal_id,
    studios,
  } = anime;

  // Events
  const handelClick = () => {
    let nextPage = page + 1;
    setIsLoading(true);
    setPage(nextPage);
    dispatch(clearEpisodesData());
    dispatch(
      fetchEpisodes(
        `https://api.jikan.moe/v4/anime/${animeID}/videos/episodes?page=${nextPage}`
      )
    ).then(() => {
      setIsLoading(false);
    });
  };

  const addToList = (anime) => {
    return (
      <div className="addToListCard">
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
    // Use gsap to animate the opacity of the div to 0

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
  return (
    <Transition>
      <section className=" anime-page">
        <div
          className="cover"
          style={{
            backgroundImage: `url(${anime.trailer.images.maximum_image_url})`,
          }}
        >
          <div className="overllay"></div>
        </div>
        <div className="container ">
          <div className="main-card animeP d-flex ">
            <div className="cardImg">
              {isLoading ? (
                <Skeleton width={250} height={380} />
              ) : (
                <img alt="" src={anime.images.jpg.large_image_url} />
              )}
            </div>
            <div className="cardInfo">
              <div className="road">
                <a href="/">Home</a>
                <i className="fa-solid fa-circle   "></i>
                <a href="/">TV</a>
                <i className="fa-solid fa-circle"></i>

                <a href="/" className="name">
                  {anime.title}
                </a>
              </div>
              <h1>{anime.title || <Skeleton height={50} />}</h1>
              <div className="tags">
                <div className="sub">
                  <span>{anime.broadcast.day}</span>
                  <span className="fk">4k</span>
                  <span>dub</span>
                  <span>sub</span>
                  <span className="tv">{anime.type}</span>
                </div>
                <div className="epsInfo">
                  <i className="fa-solid fa-circle   "></i>

                  <span className="latestEP  ">
                    {anime.episodes == null
                      ? "continuous"
                      : `${anime.episodes}Ep`}
                  </span>
                  <i className="fa-solid fa-circle  "></i>
                  <span className="epTime">
                    {anime.duration === "Unknown"
                      ? "24m"
                      : `${anime.duration.substring(0, 2)}m`}
                  </span>
                </div>
              </div>
              <div className="main-btns mt-5">
                <a href="#episode" className="wn ">
                  <i className="fa-solid fa-play"></i>
                  <span>watch now</span>
                </a>
                <button className="atl position-relative">
                  <i className="fa-solid fa-plus"></i>
                  {addToList(anime)}
                  <span onClick={() => handleClick()}>add to list</span>
                </button>
              </div>
            </div>
            <div className="cardThree  col-4 ps-5   ">
              <div className="ra-info d-flex  ">
                <ul className=" list-unstyled d-flex flex-column gap-2  text-capitalize  ">
                  <li> Japanese: {title_japanese || <Skeleton />}</li>
                  <li>
                    Aired:{" "}
                    {aired && aired.from === null
                      ? "unknown"
                      : (aired && aired.from.slice(0, 10)) || <Skeleton />}
                  </li>
                  <li>
                    Premiered:{" "}
                    {season === null ? "unknown" : season || <Skeleton />}{" "}
                    {year === null ? " " : year || <Skeleton />}
                  </li>
                  <li>Status: {status === null ? "" : status}</li>
                  <li>
                    Duration:{" "}
                    {duration === null
                      ? ""
                      : duration.slice(0, 6) || <Skeleton />}
                  </li>

                  <li> Studios: {studios[0]?.name || "unknown"}</li>
                  <li>
                    {" "}
                    MAL Score: {score === null ? "" : score || <Skeleton />}
                  </li>
                </ul>
              </div>
              <div className="genres d-flex ">
                <ul className="d-flex gap-3 flex-column justify-content-center py-3 mt-3 align-items-center list-unstyled w-fit border-top">
                  Genres:
                  <ul className="d-flex gap-3 flex-wrap list-unstyled">
                    {anime.genres.map((genre, index) => (
                      <li
                        key={index}
                        className="btn btn-light bg-transparent text-light rounded-5 "
                      >
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                </ul>
              </div>
            </div>
          </div>

          <span className="slider-title fs-4 text-uppercase  border-bottom  border-2 border-main-color">
            The Story
          </span>
          <p className="description pt-3 m-0 mb-5">
            {anime.synopsis || <Skeleton count={5} />}
          </p>
          <span className="  slider-title fs-4 text-uppercase   border-bottom  border-2 border-main-color">
            main characters
          </span>
          <div className="charactersSlider mt-4  mb-5">
            {isLoading && <SkeletonCh cards={6} />}
            {character}
          </div>
          <span className=" text-center w-fit mx-auto d-block  slider-title fs-2 text-uppercase   border-bottom  border-2 border-main-color">
            trailer
          </span>
          <div className="d-flex">
            <iframe
              title="trailer"
              width="70%"
              height="440"
              src={anime.trailer.embed_url}
              frameBorder="0"
              allowFullScreen
              className="my-5 mx-auto"
            ></iframe>
          </div>
          <span className=" text-center w-fit mx-auto d-block  slider-title fs-2 text-uppercase   border-bottom  border-2 border-main-color">
            episodes
          </span>
          <div id="episode" className="episode mt-5 row justify-content-center">
            {isLoading && <SkeletonEps cards={20} />}
            {episodes}
          </div>
          <div className="loadMore text-center py-3">
            {}
            {episodePa.has_next_page === true ? (
              <button
                onClick={handelClick}
                className=" w-fit text-center text-light  border-0 bg-transparent fs-5 text-uppercase"
              >
                View More{" "}
                <i className="fa-solid fa-up-right-from-square fs-6"></i>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </Transition>
  );
}

export default Anime;

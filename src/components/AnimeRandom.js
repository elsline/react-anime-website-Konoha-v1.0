import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../imgs/question-mark-svgrepo-com.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import gsap from "gsap";
import {
  addTPlanToWatchList,
  addToBadList,
  addToFavoriteList,
  addToWatchedList,
  addToWatchingList,
} from "../rtk/slices/my-list-slice";
import { useDispatch } from "react-redux";

function AnimeRandom() {
  // Hooks
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    handleClick();
  }, []);
  // Hooks

  const random = data;
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
  } = random;

  // Events
  const handleClick = async () => {
    setIsLoading(true);
    setData([]);
    const response = await fetch("https://api.jikan.moe/v4/random/anime");
    const data = await response.json();
    if (data.data.rating === "Rx - Hentai") {
      console.log("Anime  is Hentai");
    } else if (!data.data.rating) {
      <div></div>;
    } else if (data.data.rating === null) {
      console.log("Anime  null");
    } else if (data && data.data && data.data.rating === "Rx - Hentai") {
      console.log("Anime is Hentai");
    } else {
      setData(data.data);
    }

    setIsLoading(false);
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
  const handleClick2 = () => {
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
    <div className="container randompage mb-5 pb-5 position-relative">
      <div className="title text-center">
        <h3 className="fs-1">Are you confused what to watch?</h3>
        <button
          onClick={handleClick}
          className="ra-btn  fs-4 fw-medium  text-uppercase "
        >
          <i className="fa-solid fa-shuffle me-2"></i>
          Get Random Anime
        </button>
      </div>

      <div className="random  ">
        <div
          className={` ra-card  d-flex w-100  justify-content-center gap-5  align-items-center  `}
        >
          <div className="imgHolder">
            {isLoading ? (
              <Skeleton width={300} height={424} /> // Render skeleton loader while loading
            ) : (
              <img
                className=" img-fluid"
                alt=""
                src={
                  images && images.jpg.large_image_url
                    ? images && images.jpg.large_image_url
                    : img1
                }
              />
            )}
          </div>
          <div className="ra-info">
            <span className="fs-2 fw-medium  text-uppercase ">
              {title || <Skeleton />}
            </span>
            <ul className=" list-unstyled pt-3">
              <li>
                Japanese:{" "}
                {title_japanese || (
                  <Skeleton width={140} style={{ marginLeft: "10px" }} />
                )}
              </li>
              <li>
                Aired:
                {aired && aired.from === null
                  ? "unknown"
                  : (aired && aired.from.slice(0, 10)) || (
                      <Skeleton width={140} style={{ marginLeft: "10px" }} />
                    )}
              </li>
              <li>
                Premiered: {season === null ? "unknown" : season}
                {year === null
                  ? ""
                  : year || (
                      <Skeleton width={140} style={{ marginLeft: "10px" }} />
                    )}
              </li>
              <li>
                Status:{" "}
                {status === null
                  ? ""
                  : status || (
                      <Skeleton width={140} style={{ marginLeft: "10px" }} />
                    )}
              </li>
              <li>
                Duration:{" "}
                {duration === null
                  ? ""
                  : duration || (
                      <Skeleton width={140} style={{ marginLeft: "10px" }} />
                    )}
              </li>
              <li>
                {" "}
                MAL Score:{" "}
                {score === null
                  ? ""
                  : score || (
                      <Skeleton width={140} style={{ marginLeft: "10px" }} />
                    )}
              </li>
            </ul>
            <div className="ra-btns d-flex ">
              <Link to={`/anime/${mal_id}`} className="  ">
                <i className="fa-solid fa-play"></i>
                <span>watch now</span>
              </Link>
              <button className=" position-relative">
                <i className="fa-solid fa-plus"></i>
                {addToList(random)}
                <span
                  onClick={() => {
                    handleClick2();
                  }}
                >
                  add to list
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeRandom;

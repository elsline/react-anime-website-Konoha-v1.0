import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { clearAnime, fetchAnimeSearch } from "../rtk/slices/anime-search-slice";
import { Link } from "react-router-dom";
import { PlaceholderImg } from "./Anime";
import Footer from "../components/Footer";
import SkeletonCard from "../components/SkeletonCard";
import Transition from "../components/Transition";
function Tv() {
  // Hooks
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [activeI, setActiveI] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const animeSearchList = useSelector((state) => state.animeSearch.data);
  useEffect(() => {
    dispatch(clearAnime());
    dispatch(
      fetchAnimeSearch(`anime?q&type=tv&order_by=${activeFilter}&page=${page}`)
    ).then(() => {
      setIsLoading(false);
    });
  }, []);
  // Hooks

  // Events
  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(clearAnime());
    setIsLoading(true);
    dispatch(
      fetchAnimeSearch(
        `https://api.jikan.moe/v4/anime?q&type=tv&order_by=${activeFilter}&page=${nextPage}`
      )
    ).then(() => {
      setIsLoading(false);
    });
  };
  const handlePrevPage = () => {
    const prevPage = page - 1;
    dispatch(clearAnime());
    setPage(prevPage);
    setIsLoading(true);
    dispatch(
      fetchAnimeSearch(
        `https://api.jikan.moe/v4/anime?q&type=tv&order_by=${activeFilter}&page=${prevPage}`
      )
    ).then(() => {
      setIsLoading(false);
    });
  };
  const lis = ["title", "episodes", "score", "rank", "popularity", "favorites"];
  const handleItemClick = (index) => {
    setActiveI(index);
  };
  const handleDispatch = (item) => {
    const newFilter = item;
    setActiveFilter(newFilter);
    dispatch(clearAnime());
    setIsLoading(true);
    dispatch(
      fetchAnimeSearch(
        `https://api.jikan.moe/v4/anime?q&type=tv&order_by=${newFilter}&page=${page}`
      )
    ).then(() => {
      setIsLoading(false);
    });
  };
  // Events

  return (
    <Transition>
      <section>
        <div className="container  pt-5 search-page">
          <ul className="filter d-flex justify-content-center align-items-center text-uppercase fs-5 searchUl">
            {lis.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleItemClick(index);
                    handleDispatch(item);
                  }}
                  className={index === activeI ? "active" : ""}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          <Row className=" ">
            {isLoading && <SkeletonCard cards={30} />}
            {animeSearchList &&
              animeSearchList.map((anime) => (
                <Link
                  className="col-lg-2 col-md-4 col-sm-6 col-6"
                  to={`/anime/${anime.mal_id}`}
                  key={anime.mal_id}
                >
                  <div className="anime-card ">
                    <div className="imgHolder">
                      <img
                        className="w-100"
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
              ))}
          </Row>
          <div className="btns d-flex justify-content-between my-5 ">
            <button
              onClick={handlePrevPage}
              className="border-0 bg-transparent text-light fs-4 text-uppercase fw-medium "
            >
              <i className="fa-solid fa-arrow-left fs-2"></i>
            </button>
            <button
              onClick={handleNextPage}
              className="border-0 bg-transparent text-light fs-4 text-uppercase fw-medium   "
            >
              <i className="fa-solid fa-arrow-right fs-2"></i>
            </button>
          </div>
        </div>
        <Footer className="main-bg-2" />
      </section>
    </Transition>
  );
}

export default Tv;

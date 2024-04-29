import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { clearAnime, fetchAnimeSearch } from "../rtk/slices/anime-search-slice";
import { Link } from "react-router-dom";
import { PlaceholderImg } from "./Anime";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../components/SkeletonCard";
import Transition from "../components/Transition";

function Search() {
  // Hooks
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeI, setActiveI] = useState(null);
  const [activeFilter, setActiveFilter] = useState("title");
  const [isLoading, setIsLoading] = useState(true);
  const animeSearchList = useSelector((state) => state.animeSearch.data);
  useEffect(() => {
    dispatch(
      fetchAnimeSearch(
        `https://api.jikan.moe/v4/anime?q=${query.trim()}&type=tv&order_by=${activeFilter}&page=${page}`
      )
    ).then(() => {
      setIsLoading(false);
    });
    dispatch(clearAnime());
  }, []);
  // Hooks

  // Events
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1); // Reset page to 1\
    setIsLoading(true);
    if (query.trim() !== "") {
      dispatch(clearAnime());
      dispatch(
        fetchAnimeSearch(
          `https://api.jikan.moe/v4/anime?q=${query.trim()}&type=tv&page=1&order_by=${activeFilter}`
        )
      ).then(() => {
        setIsLoading(false);
      });
    }
  };
  const handleNextPage = () => {
    setIsLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);
    if (query.trim() !== "") {
      dispatch(clearAnime());
      dispatch(
        fetchAnimeSearch(
          `https://api.jikan.moe/v4/anime?q=${query.trim()}&type=tv&order_by=${activeFilter}&page=${nextPage}`
        )
      ).then(() => {
        setIsLoading(false);
      });
    }
  };
  const handlePrevPage = () => {
    const prevPage = page - 1;
    setIsLoading(true);
    setPage(prevPage);
    if (query.trim() !== "") {
      dispatch(clearAnime());
      dispatch(
        fetchAnimeSearch(
          `anime?q=${query.trim()}&type=tv&order_by=${activeFilter}&page=${prevPage}`
        )
      ).then(() => {
        setIsLoading(false);
      });
    }
  };
  const lis = ["title", "episodes", "score", "rank", "popularity", "favorites"];
  const handleItemClick = (index) => {
    setActiveI(index);
  };
  const handleDispatch = (item) => {
    const newFilter = item;
    setActiveFilter(newFilter);
    setIsLoading(true);
    if (query.trim() !== "") {
      dispatch(clearAnime());
      dispatch(
        fetchAnimeSearch(
          `https://api.jikan.moe/v4/anime?q=${query.trim()}&type=tv&order_by=${newFilter}&page=${page}`
        )
      ).then(() => {
        setIsLoading(false);
      });
    }
  };

  // Events

  return (
    <Transition>
      <section>
        <div className="container  pt-5 search-page">
          <Col className="nav-search-holder">
            <form onSubmit={handleSubmit}>
              <Form.Control
                value={query}
                onChange={handleInputChange}
                type="text"
                placeholder="Search Anime"
                className=" mr-sm-2 nav-search py-2"
              />
            </form>
            <i onClick={handleSubmit} className=" curs-p fas fa-search"></i>
          </Col>
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
            {isLoading && <SkeletonCard cards={20} />}
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

export default Search;

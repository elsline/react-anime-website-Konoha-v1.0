import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { clearAnimee, fetchAnimeList } from "../rtk/slices/anime-list-slice";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import SkeletonCard from "../components/SkeletonCard";
import Transition from "../components/Transition";

function AnimeListFO() {
  const [active, setActive] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const animeList = useSelector((state) => state.animeList.data);
  useEffect(() => {
    dispatch(clearAnimee());
    dispatch(
      fetchAnimeList(
        `https://api.jikan.moe/v4/top/anime?filter=favorite&page=${bulletID}&sfw=true`
      )
    ).then(() => {
      setIsLoading(false);
    });
  }, []);

  let bullets = [];
  const handelActive = (index) => {
    setActive(index);
    if (bullets.length > 0) {
      const bullets = document.querySelectorAll(".bullets li");
      bullets[0].classList.remove("active");
    }
  };
  // Generating links dynamically
  const { bulletID } = useParams();
  let bulNumber = 10;
  for (let i = 1; i <= bulNumber; i++) {
    bullets.push(
      <li
        className={i === active ? "active" : ""}
        onClick={() => handelActive(i)}
        key={i}
      >
        <Link onClick={() => handelDispatch(i)} to={`/animelist/favorite/${i}`}>
          {i}
        </Link>
      </li>
    );
  }
  const handelBulltes = () => {
    let i = 11;
    bullets = [];
    bullets.push(
      <li key={i}>
        <Link
          onClick={() => dispatch(fetchAnimeList(i))}
          to={`/animelist/favorite/${i}`}
        >
          {i}
        </Link>
      </li>
    );
  };
  const handelDispatch = (i) => {
    dispatch(clearAnimee());
    setIsLoading(true);
    dispatch(
      fetchAnimeList(
        `https://api.jikan.moe/v4/top/anime?filter=favorite&page=${i}&sfw=true`
      )
    ).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <Transition>
      <section className="main-bg-2">
        <div className="container  pt-5 search-page">
          <span className="fs-1 fw-medium text-uppercase text-center w-100 d-block mb-4 ">
            Most <span className="main-color">Favorite</span>
          </span>
          <Row>
            {isLoading && <SkeletonCard cards={20} />}
            {animeList &&
              animeList.map((anime) => (
                <Link
                  className="anime-card col-lg-2 col-md-4 col-sm-6 col-6"
                  to={`/anime/${anime.mal_id}`}
                  key={anime.mal_id}
                >
                  <div className="anime-card ">
                    <img src={anime.images.jpg.image_url} alt=""></img>
                    <span className="d-flex  align-item  gap-1  ">
                      <span className=" title ">{anime.title}</span>
                    </span>
                  </div>
                </Link>
              ))}
          </Row>
          <ul className="bullets d-flex justify-content-center">
            <button
              onClick={() => handelBulltes()}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <i className="fa-solid fa-angle-left text-white fs-5 mt-2"></i>
            </button>
            {bullets}
            <button style={{ backgroundColor: "transparent", border: "none" }}>
              <i className="fa-solid fa-angle-right text-white fs-5 mt-2"></i>
            </button>
          </ul>
        </div>
      </section>
      <Footer />
    </Transition>
  );
}
export default AnimeListFO;

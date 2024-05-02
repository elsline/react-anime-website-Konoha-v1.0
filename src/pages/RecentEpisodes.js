import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentEps } from "../rtk/slices/recent-slice";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCard from "../components/SkeletonCard";
import Transition from "../components/Transition";

function RecentEpisodes() {
  // Hooks
  const recent = useSelector((state) => state.recentEps.getRecentEps.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecentEps("watch/episodes")).then(() => {
      setIsLoading(false);
    });
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  // Hooks
  return (
    <Transition>
      <section>
        <div className="container  py-5 search-page">
          <span className="fs-1 fw-medium text-uppercase text-center w-100 d-block mb-4 ">
            Recent <span className="main-color">Episodes</span>
          </span>
          <Row className=" ">
            {isLoading && <SkeletonCard cards={20} />}
            {recent &&
              recent.map((anime) => (
                <Link
                  className="col-lg-2 col-md-4 col-sm-6 col-6"
                  to={`/anime/${anime.entry.mal_id}`}
                  key={anime.entry.mal_id}
                >
                  <div className="anime-card ">
                    <div className="imgHolder">
                      <img
                        className="w-100"
                        src={anime.entry.images.jpg.image_url || <Skeleton />}
                        alt=""
                      ></img>
                    </div>
                    <span>{anime.episodes[0].title || <Skeleton />}</span>
                  </div>
                </Link>
              ))}
          </Row>
        </div>
      </section>
    </Transition>
  );
}
export default RecentEpisodes;

import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonAnime({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <section className=" anime-page" key={i}>
        <div>
          <div className="overllay"></div>
        </div>
        <div className="container ">
          <div className="main-card animeP d-flex ">
            <div className="cardImg">
              <Skeleton height={380} width={250} />
            </div>
            <div className="cardInfo">
              <div className="road">
                <Skeleton width={150} />
              </div>
              <h1>
                <Skeleton width={350} height={40} />
              </h1>
              <div className="tags">
                <div className="d-flex gap-3">
                  <Skeleton width={50} />
                  <Skeleton width={50} />
                  <Skeleton width={50} />
                  <Skeleton width={50} />
                </div>
                <div className="epsInfo">
                  <i className="fa-solid fa-circle   "></i>

                  <span className="latestEP  ">
                    <Skeleton width={30} />
                  </span>
                  <i className="fa-solid fa-circle  "></i>
                  <span className="epTime">
                    <Skeleton width={30} />
                  </span>
                </div>
              </div>
              <div className="main-btns mt-5">
                <div href="#episode" className=" ">
                  <Skeleton width={130} height={35} borderRadius={20} />
                </div>
              </div>
            </div>
            <div className="cardThree  col-4 ps-5   ">
              <div className="ra-info d-flex  ">
                <ul className=" list-unstyled d-flex flex-column gap-2  text-capitalize  ">
                  <li>
                    <Skeleton width={230} />{" "}
                  </li>
                  <li>
                    <Skeleton width={230} />{" "}
                  </li>
                  <li>
                    <Skeleton width={230} />{" "}
                  </li>
                  <li>
                    <Skeleton width={230} />{" "}
                  </li>
                  <li>
                    <Skeleton width={230} />{" "}
                  </li>
                  <li>
                    <Skeleton width={230} />{" "}
                  </li>
                </ul>
              </div>
              <div className="genres d-flex ">
                <ul className="d-flex gap-3 flex-column justify-content-center py-3 mt-3 align-items-center list-unstyled w-fit border-top">
                  <ul className="d-flex gap-3 flex-wrap list-unstyled">
                    <Skeleton width={50} />
                    <Skeleton width={50} />
                    <Skeleton width={50} />
                  </ul>
                </ul>
              </div>
            </div>
          </div>

          <span className="slider-title fs-4 text-uppercase  border-bottom  border-2 border-main-color"></span>
          <p className="description pt-3 m-0 mb-5">
            <Skeleton width={850} />
            <Skeleton width={850} />
            <Skeleton width={850} />
            <Skeleton width={850} />
            <Skeleton width={450} />
          </p>
          <span className="  slider-title fs-4 text-uppercase   border-bottom  border-2 border-main-color"></span>
          <div className="charactersSlider mt-4  mb-5">
            <Skeleton width={450} />
          </div>
          <span className=" text-center w-fit mx-auto d-flex gap-5  slider-title fs-2 text-uppercase   border-bottom  border-2 border-main-color">
            <Skeleton width={200} height={200} />
            <Skeleton width={200} height={200} />
            <Skeleton width={200} height={200} />
            <Skeleton width={200} height={200} />
          </span>
        </div>
      </section>
    ));
}

export default SkeletonAnime;

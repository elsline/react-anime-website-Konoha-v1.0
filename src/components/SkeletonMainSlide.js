import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonMainSlide({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <section className=" anime-page z-1000">
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
          </div>
        </div>
      </section>
    ));
}

export default SkeletonMainSlide;

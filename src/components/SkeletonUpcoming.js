import React from "react";
import { Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";


function SkeletonUpcoming() {
  return (
    <div className="showAnime row ">
      <Col xs="12" md="12" lg="8">
        <div className="imgHolder">
          <div className="w-100">
            <Skeleton height={300} />
          </div>
        </div>
      </Col>
      <Col xs="12" md="12" lg="4">
        <div className="main-card ashow p-0">
          <h1 className="mb-1 h-111 fs-70">
            <Skeleton height={30} />
          </h1>
          <span className="season fs-4 text-uppercase fw-medium ">
            <Skeleton width={200}  />
          </span>
          <p className="description fs-16 mt-3 h-111">
            <Skeleton width={360} />
          </p>
          <div className="main-btns">
            <a target="_blank" className="wn ">
              <i className="fa-brands fa-youtube"></i>
              <span>watch trailer</span>
            </a>
            <a className="atl">
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              <span>more info</span>
            </a>
          </div>
        </div>
      </Col>
    </div>
  );
}

export default SkeletonUpcoming;

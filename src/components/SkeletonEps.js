import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonEps({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <>
        <div className="  epCard  curs-p col-lg-2  col-6 d-flex flex-column text-decoration-none text-light">
          <div className="h-100">
            <Skeleton height={125} />
          </div>
          <span className=" fw-medium text-uppercase pt-2  ">
            <Skeleton />
          </span>
        </div>
      </>
    ));
}

export default SkeletonEps;

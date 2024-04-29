import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonRandom() {
  return (
    <div className="random  ">
      <div
        className={` ra-card  d-flex w-100  justify-content-center gap-5  align-items-center  `}
      >
        <div className="imgHolder">
          <div className="" style={{ width: "300px" }}>
            <Skeleton height={424} />
          </div>
        </div>
        <div className="ra-info mb-2">
          <span className="fs-2 fw-medium  text-uppercase ">
            <Skeleton width={300}
            />
          </span>
          <ul className=" list-unstyled mb-5 pb-5">
            <li>
              <Skeleton width={200} />
            </li>
            <li>
              <Skeleton width={200} />
            </li>
            <li>
              <Skeleton width={200} />
            </li>
            <li>
              <Skeleton width={200} />
            </li>
            <li>
              <Skeleton width={200} />
            </li>
            <li>
              <Skeleton width={200} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SkeletonRandom;

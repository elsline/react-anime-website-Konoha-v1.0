import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonCh({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div className="imgCard d-flex flex-column p-0 m-0  align-items-center">
        <div className="">
          <Skeleton height={200} width={200} />
        </div>
        <span className="mt-2">
          <Skeleton   height={25} width={200}/>
        </span>
      </div>
    ));
}

export default SkeletonCh;

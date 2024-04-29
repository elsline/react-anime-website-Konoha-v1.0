import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonCard({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div className="anime-card col-lg-2 col-md-4 col-sm-6 col-6 " key={i}>
        <span>
          <Skeleton height={280} />
        </span>
        <span>
          <Skeleton />
        </span>
      </div>
    ));
}

export default SkeletonCard;

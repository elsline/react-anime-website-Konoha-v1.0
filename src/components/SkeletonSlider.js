import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonSlider({ cards, cols }) {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div className={cols} key={i}>
        <span>
          <Skeleton height={290} />
        </span>
        <span>
          <Skeleton className="mt-2" height={20} />
        </span>
      </div>
    ));
}

export default SkeletonSlider;

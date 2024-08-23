import React from "react";
import Skeleton from "react-loading-skeleton";

const EmptyCardSkeleton = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className="w-full" key={index}>
          <div className="mb-3">
            <Skeleton height={250} />
            <div className="mt-3">
              <Skeleton height={10} width={100} />
            </div>
            <div className="mt-2">
              <Skeleton height={20} />
            </div>
            <div className="mt-3">
              <Skeleton count={5} height={8} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// uK8cG9okg8SttnodGunKtnbOfOzn5Ftq
export default EmptyCardSkeleton;

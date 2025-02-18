import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Image
        src="/icons/loader.svg"
        alt="Loading"
        width={64}
        height={64}
        className={"animate-spin"}
      />
    </div>
  );
};

export default Loading;

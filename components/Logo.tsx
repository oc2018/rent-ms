"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-gray-300 flex items-center gap-2 border-gray-100 border-[1px] p-1 rounded-lg"
    >
      <Image
        className="rounded-sm"
        src="/icons/logo.png"
        alt="ontime"
        width={37}
        height={37}
      />
      <div>
        <b className="text-green-500 text-2xl leading-[0.1px]">Ontime</b>
        <p className="leading-[0.1px]">Rental</p>
      </div>
    </Link>
  );
};

export default Logo;

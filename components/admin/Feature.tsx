import { currencyFormatter } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface FeatureProps {
  title: string;
  percentage: number;
  value: number;
  icon: string;
  addStyles: string;
}

const Feature = ({
  title,
  percentage,
  value,
  icon,
  addStyles,
}: FeatureProps) => {
  return (
    <div className="border py-6 px-10 border-slate-300 bg-white rounded-2xl flex flex-col gap-2">
      <div className="text-xl text-gray-500">{title}</div>
      <div className="text-4xl lg:text-3xl py-1 font-bold ">
        KSH {currencyFormatter(value)}
      </div>
      <div className="flex items-center flex-row gap-2">
        <div className={`flex gap-1 py-1 px-2 rounded-lg ${addStyles}`}>
          <Image src={icon} alt="icon" width={16} height={16} /> {percentage}%
        </div>
        <div className="text-gray-400">compared to last year</div>
      </div>
    </div>
  );
};

export default Feature;

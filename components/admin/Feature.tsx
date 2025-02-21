import React from "react";

const Feature = () => {
  return (
    <div className="border p-6 border-slate-300 bg-white rounded-2xl flex flex-col gap-2">
      <div className="text-xl text-gray-500">Total Income</div>
      <div className="text-4xl mt-3 font-bold">KSH 150,000.00</div>
      <div className="flex items-center flex-row gap-2">
        <div className="p-1 bg-green-200 text-green-700 rounded-lg">
          ↑ 12.95%
        </div>
        <div className="text-gray-400">compared to last year</div>
      </div>
    </div>
  );
};

export default Feature;

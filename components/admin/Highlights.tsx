import Image from "next/image";
import React from "react";
import { DataTable } from "./Tables/DataTable";
import { RentDueColumns } from "./Tables/RentDueColumns";

const Highlights = ({ rentDueData }: { rentDueData: RentDueDataProps[] }) => {
  return (
    <div className="flex flex-col border p-6 border-slate-300 bg-white rounded-2xl  lg:w-2/3">
      <div className="flex flex-row w-full justify-between ">
        <div className="">
          <h3 className="text-2xl font-semibold">Rent Due</h3>
        </div>
        <div className="flex justify-center items-center gap-2 mr-1">
          <Image
            src="/icons/admin/download.svg"
            alt="icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <Image
            src="/icons/admin/ellipsis.svg"
            alt="icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="mt-4 w-full">
          <DataTable columns={RentDueColumns} data={rentDueData} />
        </div>
      </div>
    </div>
  );
};

export default Highlights;

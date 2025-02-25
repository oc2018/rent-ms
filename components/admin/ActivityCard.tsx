import { dateFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ActivityCard = ({ recentData }: { recentData: Txn[] }) => {
  // console.log(recentData);
  return (
    <div>
      {recentData.map((item) => (
        <div
          key={item?.transactionId}
          className="flex flex-row border-b py-3 border-gray-400 gap-6"
        >
          <div className="">
            {item?.createdAt && dateFormatter(item?.createdAt)}
          </div>
          <div className="flex flex-col ">
            <h2 className="text-sm">{`${item?.description}`}</h2>
            <p className="text-sm text-gray-500">{`${
              item?.expenseId ? "Expense account" : "Payment account"
            }`}</p>
          </div>
          <div className="flex flex-end ">
            <Link href={`/${item?.expenseId ? "expenses" : "rentaccount"}`}>
              <Image
                src="/icons/admin/move-up-right.svg"
                alt="arrow"
                width={24}
                height={24}
                className=""
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityCard;

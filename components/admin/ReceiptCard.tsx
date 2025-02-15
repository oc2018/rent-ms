"use client";

import config from "@/lib/config";
import { addZeros, currencyFormatter, dateFormatter } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import React from "react";

const ReceiptCard = ({ expenseDetails }: { expenseDetails: Expense }) => {
  const { createdAt, expenseNo, description, expenseAmount, receiptImgUrl } =
    expenseDetails;
  return (
    <div className="flex flex-col h-full rounded-2xl bg-white p-7 lg:flex-row w-full">
      <div className="flex flex-col items-center justify-center lg:w-1/2 h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <h3 className="font-semibold text-primary-admin text-2xl">
            Expense No: {addZeros(expenseNo)}
          </h3>
          <div className="text-gray-600">
            Date: {createdAt && dateFormatter(createdAt)}
          </div>
        </div>
        <div className="flex  w-full h-full p-10 flex-col">
          <div className="flex">
            <div className="w-3/4 border-b border-r border-primary-admin">
              <p className=" py-4 font-semibold">Description</p>
            </div>
            <div className="lg:w-3/4 w-1/4 border-b text-semibold border-primary-admin">
              <p className="font-semibold py-4 text-end ">Amount</p>
            </div>
          </div>
          <div className="flex h-3/4">
            <div className="w-3/4 space-y-10 lg:space-y-56 h-full border-r border-primary-admin">
              <p className="py-2">{description}</p>

              <h4 className="align-text-bottom py-2 font-semibold">
                Account to Charge: <br />
                General Account
              </h4>
            </div>
            <div className="lg:w-3/4 space-y-10 lg:space-y-60 ">
              <p className="py-2 text-end">
                {expenseAmount && currencyFormatter(expenseAmount)}
              </p>

              <h4 className="py-2 text-end font-semibold">
                Total: {expenseAmount && currencyFormatter(expenseAmount)}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2  h-full">
        <div className="flex flex-col w-full items-center  justify-center">
          <h3 className="font-semibold text-primary-admin text-2xl">Receipt</h3>
          <p className="text-gray-600">
            Receipt Date: {createdAt && dateFormatter(createdAt)}
          </p>
        </div>
        <div className="flex justify-center h-full items-center">
          <div className="flex relative items-center justify-center w-full lg:w-3/4 rounded-lg lg:h-3/4 h-[350px] lg:min-h-1/2 bg-gray-300">
            {receiptImgUrl ? (
              <>
                <IKImage
                  path={receiptImgUrl}
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                  alt="receipt"
                  fill
                  lqip={{ active: true }}
                  loading="lazy"
                  className="rounded-lg object-fill"
                />
              </>
            ) : (
              "Receipt"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptCard;

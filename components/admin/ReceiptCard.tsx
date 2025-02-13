import { addZeros, currencyFormatter, dateFormatter } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import React from "react";

const ReceiptCard = ({ expenseDetails }: { expenseDetails: Expense }) => {
  const receiptImgUrl = false;

  const { createdAt, expenseNo, description, expenseAmount } = expenseDetails;
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-1/2 h-full">
        <div className="">
          <h3 className="font-semibold text-primary-admin text-2xl">
            Expense No: {addZeros(expenseNo)}
          </h3>
          <div className="text-gray-600">
            Date: {createdAt && dateFormatter(createdAt)}
          </div>
        </div>
        <div className="flex w-full h-full p-10 flex-col">
          <div className="flex w-3/4 ">
            <div className="w-3/4 p-4 border-b  border-r border-primary-admin">
              <p className="font-semibold">Description</p>
            </div>
            <div className="w-3/4 p-4 border-b text-semibold border-primary-admin">
              <p className="font-semibold">Amount</p>
            </div>
          </div>
          <div className="flex w-3/4 h-3/4">
            <div className="w-3/4 h-full border-r border-primary-admin">
              <p className="p-2">{description}</p>
              <h4 className="align-text-bottom p-2 font-semibold">
                Account to Charge: <br />
                General Account
              </h4>
            </div>
            <div className="w-3/4 ">
              <p className="p-2 text-end">
                {expenseAmount && currencyFormatter(expenseAmount)}
              </p>
              <h4 className="p-2 text-end font-semibold">
                Total: {expenseAmount && currencyFormatter(expenseAmount)}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-primary-admin text-2xl">Receipt</h3>
          <p className="text-gray-600">
            Receipt Date: {createdAt && dateFormatter(createdAt)}
          </p>
        </div>
        <div className="flex justify-center h-full items-center">
          <div className="flex relative items-center justify-center w-3/4 rounded-lg h-[350px] bg-gray-300">
            {receiptImgUrl ? (
              <>
                <IKImage
                  src={receiptImgUrl}
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

"use client";

import React from "react";
import StatusBadge from "../StatusBadge";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { currencyFormatter } from "@/lib/utils";
import AgentCard from "./AgentCard";
import MapCard from "./MapCard";

const PropertyCard = ({
  propertyDetails,
}: {
  propertyDetails: PropertyCardProps;
}) => {
  const {
    propertyNo,
    propertySize,
    propertyImage,
    propertyLocation,
    propertyOwner,
    rent,
    deposit,
    status,
  } = propertyDetails;
  return (
    <>
      <div className="w-full h-full flex flex-col  rounded-2xl bg-white p-7 gap-7">
        <div className="w-full md:p-3 flex flex-col md:flex-row gap-7 items-center justify-between">
          <div className="">
            <h2 className="font-bold text-2xl ">{propertyNo}</h2>
            <p className="text-gray-600 ">
              <span className="font-semibold">Location: </span>
              {propertyLocation}
            </p>
          </div>
          <div className="p-2 border border-primary-admin rounded-lg ">
            <StatusBadge status={status} />
          </div>
        </div>
        <div className="relative w-full flex flex-col md:flex-row gap-7">
          <div
            className="relative min-w-[200px] w-1/3 sm:w-full h-[15em] left-0"
            // style={{ left: "0", sm:{width: "100%"}, width: "33%", height: "15em" }}
          >
            <IKImage
              path={propertyImage}
              urlEndpoint={config.env.imagekit.urlEndpoint}
              alt="property"
              fill
              className="roundend-lg object-fill"
              loading="lazy"
              lqip={{ active: true }}
            />
          </div>
          <div className="w-full md:max-w-[65%]">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl">{propertySize} Apartment</h3>
              <p className="">
                <b>Owner: </b>
                {propertyOwner}
              </p>
              <p className="">{`Charming ${propertySize} Gem! Modern, sunlit apartment with sleak kitchen, spacious bedrooms and stylish bathromms. Open living area flows to a private balcony perfect for morning coffee! Prime walkable location near an Hospital, Schools and with secure parking. Ideal for professionals or small families. It is move-in ready.`}</p>
            </div>
            <div className="flex flex-col items-center md:flex-row justify-around">
              <div className="flex items-center mt-3 gap-4">
                <Image
                  src={"/icons/home.svg"}
                  alt="icon"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col">
                  <p className="text-gray-600">Rent Amount</p>
                  <h4 className="font-semibold text-xl">
                    KSH:{currencyFormatter(rent)}
                  </h4>
                </div>
              </div>
              <div className="flex items-center mt-3 gap-4">
                <Image
                  src={"/icons/home.svg"}
                  alt="icon"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col">
                  <p className="text-gray-600">Deposit Amount</p>
                  <h4 className="font-semibold text-xl">
                    KSH:{currencyFormatter(deposit)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col md:flex-row gap-7">
          <div className="w-[33%] h-full">
            <AgentCard fullName={propertyOwner} />
          </div>
          <div className="w-full">
            <MapCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;

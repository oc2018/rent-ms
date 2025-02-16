"use client";

import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import React from "react";
import StatusBadge from "./StatusBadge";
import { dateFormatter } from "@/lib/utils";
import clsx from "clsx";

const ProfileCard = ({ userDetails }: { userDetails: ProfileCardProps[] }) => {
  console.log(userDetails);
  return (
    <>
      {userDetails.map((user) => (
        <div
          key={user.id}
          className="flex w-full flex-col lg:flex-row gap-4 pt-10"
        >
          <div className="flex flex-col lg:w-1/2 gap-4">
            <div className="flex relative items-center justify-center w-full lg:w-full rounded-lg h-[350px] lg:min-h-1/2 ">
              <IKImage
                path={user.idCard}
                alt="id card"
                urlEndpoint={config.env.imagekit.urlEndpoint}
                fill
                lqip={{ active: true }}
                loading="lazy"
                className="rounded-lg"
              />
            </div>
            <p className="text-14-medium text-primary">Edit Profile</p>
          </div>
          <div className="lg:w-full lg:pl-5 flex flex-col gap-6">
            <div
              className={clsx("flex justify-between p-4 border rounded-lg", {
                "border-green-600": user.status === "APPROVED",
                "border-red-600": user.status === "REJECTED",
                "border-orange-600": user.status === "PENDING",
              })}
            >
              <h2 className="text-18 font-bold text-2xl">Tenancy Status:</h2>
              <StatusBadge status={user.status} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-18 font-bold text-2xl">
                Tenant Name: {user.fullName}
              </h2>
              <p className="text-xl font-semibold">Rent Due: </p>
              <p className="">
                Last Activity Date:{" "}
                {user.lastActivityDate && dateFormatter(user.lastActivityDate)}
              </p>
            </div>
            <div className="flex flex-col md:flex-row w-full overflow-hidden">
              <div className="w-1/2">
                <p className="text-14-medium">
                  House Number: {user.propertyNo}
                </p>
                <p className="text-14-medium">
                  Phone Number: {user.phoneNumber}{" "}
                </p>
                <p className="text-14-medium">Email: {user.email} </p>
              </div>
              <div className="">
                <p className="text-14-medium">ID Number: {user.idNumber} </p>
                <p className="text-14-medium">KRA Pin: {user.kraPin} </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProfileCard;

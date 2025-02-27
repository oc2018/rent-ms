"use client";

import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";

const ProfileLink = ({ session }: { session: Session }) => {
  return (
    <Link href={"/my-profile"}>
      <Avatar className="bg-green-300">
        {/* <AvatarImage src={session?.user?.avator} /> */}
        <AvatarFallback className="font-bold bg-primary">
          {getInitials(session?.user?.name || "Oc")}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default ProfileLink;

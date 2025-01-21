"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex w-full justify-between gap-5">
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
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/properties"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/properties" ? "text-light-200" : "text-light-100"
            )}
          >
            Properties
          </Link>
        </li>
        <li>
          <Link
            href="/customers"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/customers" ? "text-light-200" : "text-light-100"
            )}
          >
            customers
          </Link>
        </li>
        <li>
          <Link
            href="/transactions"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/transactions" ? "text-light-200" : "text-light-100"
            )}
          >
            transactions
          </Link>
        </li>
        <li>
          <Link href={"/my-profile"}>
            <Avatar className="bg-green-300">
              {/* <AvatarImage src={session?.user?.avator} /> */}
              <AvatarFallback className="font-bold bg-primary">
                {getInitials(session?.user?.name || "Oc")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        {/* <li>
          <Link href={"/my-profile"}>
            <Image
              src="/icons/logout.svg"
              alt="logout"
              width={35}
              height={35}
            />
          </Link>
        </li> */}
      </ul>
    </header>
  );
};

export default Header;

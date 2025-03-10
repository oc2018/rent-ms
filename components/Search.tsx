import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex relative">
      <Image
        src={"/icons/admin/search.svg"}
        alt="search-icon"
        width={20}
        height={20}
        className="absolute top-1/2 left-2 -translate-y-1/2 "
      />
      <Input
        placeholder="Search"
        className="p-2 pl-8 outline-none border-primary-admin"
      />
      {/* <Image
        src="/icons/admin/move-up-right.svg"
        alt="send"
        width={20}
        height={20}
        className="abolute top-0 right-0 -translate-y-1/2"
      /> */}
    </div>
  );
};

export default Search;

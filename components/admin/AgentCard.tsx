import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const AgentCard = ({ fullName }: { fullName: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async () => {
    setIsLoading(true);
    console.log("call agent");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full p-10 gap-7 justify-between border border-primary-admin rounded-lg ">
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <Image
            src={"/icons/admin/user.svg"}
            alt="Icon"
            width={18}
            height={18}
          />
          <p className="text-gray-600">Agent Details</p>
        </div>
        <h3 className="font-semibold text-2xl">{fullName}</h3>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={submitHandler} disabled={isLoading}>
          CONTACT AGENT & VIEW
        </Button>
      </div>
    </div>
  );
};

export default AgentCard;

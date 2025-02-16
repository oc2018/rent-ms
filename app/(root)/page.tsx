import Metrics from "@/components/Metrics";
import NotPaid from "@/components/NotPaid";
// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";
import React from "react";

const Home = async () => {
  // const result = await db.select().from(users);
  // console.log(JSON.stringify(result, null, 2));
  return (
    <div className="w-full">
      <Metrics />
      <NotPaid />
    </div>
  );
};

export default Home;

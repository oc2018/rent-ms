import React from "react";

const page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        Table
        {/* <PropertyList allProperties={allProperties} /> */}
      </div>
    </section>
  );
};

export default page;

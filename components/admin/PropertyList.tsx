import React from "react";
import { DataTable } from "./Tables/DataTable";
import { propertiesColumns } from "./Tables/propertiesColumns";

interface Props {
  allProperties: Property[];
}

const PropertyList = ({ allProperties }: Props) => {
  return (
    <section className={"containerClassName"}>
      <DataTable columns={propertiesColumns} data={allProperties} />
    </section>
  );
};

export default PropertyList;

import React from "react";
import { DataTable } from "./Tables/DataTable";
import { tenantColumns } from "./Tables/TenantsColumns";

interface Props {
  tenants: User[];
}

const TenantsList = ({ tenants }: Props) => {
  return (
    <section>
      <DataTable columns={tenantColumns} data={tenants} />
    </section>
  );
};

export default TenantsList;

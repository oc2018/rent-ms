import React from "react";
import { DataTable } from "./Tables/DataTable";
import { tenantColumns } from "./Tables/TenantsColumns";

const TenantsList = ({ tenants }: { tenants: User[] }) => {
  return (
    <section>
      <DataTable columns={tenantColumns} data={tenants} />
    </section>
  );
};

export default TenantsList;

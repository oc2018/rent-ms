import React from "react";
import { DataTable } from "./admin/Tables/DataTable";
import { userTxnColumns } from "./tables/userTxnColumns";

const UserTxnList = ({ userTxns }: { userTxns: UserTxnListProps[] }) => {
  return (
    <>
      <DataTable columns={userTxnColumns} data={userTxns} />
    </>
  );
};

export default UserTxnList;

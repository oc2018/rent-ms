import React from "react";
import { DataTable } from "./Tables/DataTable";
import { txnColumns } from "./Tables/TxnColumns";

const TransactionsList = ({ allTxns }: { allTxns: Txn[] }) => {
  return (
    <div>
      <DataTable columns={txnColumns} data={allTxns} />
    </div>
  );
};

export default TransactionsList;

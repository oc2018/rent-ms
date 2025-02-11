import React from "react";
import { DataTable } from "./Tables/DataTable";
import { paymentsColumns } from "./Tables/paymentsColumns";

const PaymentList = ({ allPayments }: { allPayments: PaymentListProps[] }) => {
  return (
    <div>
      <DataTable columns={paymentsColumns} data={allPayments} />
    </div>
  );
};

export default PaymentList;

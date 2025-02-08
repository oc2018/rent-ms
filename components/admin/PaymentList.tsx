import React from "react";
import { DataTable } from "./Tables/DataTable";
import { paymentsColumns } from "./Tables/paymentsColumns";

interface props {
  allPayments: Payment[];
}

const PaymentList = ({ allPayments }: props) => {
  return (
    <div>
      <DataTable columns={paymentsColumns} data={allPayments} />
    </div>
  );
};

export default PaymentList;

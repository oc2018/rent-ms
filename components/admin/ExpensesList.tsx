import React from "react";
import { DataTable } from "./Tables/DataTable";
import { expensesColumns } from "./Tables/expensesColumns";

const ExpensesList = ({ allExpenses }: { allExpenses: Expense[] }) => {
  return (
    <div>
      <DataTable columns={expensesColumns} data={allExpenses} />
    </div>
  );
};

export default ExpensesList;

"use client";

import { expenseSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { createExpense } from "@/lib/admin/actions/expense";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createTxn } from "@/lib/admin/actions/transactions";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/lib/constants";
import SubmitButton from "../SubmitButton";

const ExpenseForm = ({ type }: { type: "create" | "edit" }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      expenseAmount: 0.0,
    },
  });

  const onSubmit = async (values: z.infer<typeof expenseSchema>) => {
    if (type === "create") {
      const result = await createExpense(values);

      if (result.success) {
        const { description, expenseAmount, expenseId } = result.data;

        const txnData = {
          description,
          isDebit: true,
          transactionAmount: expenseAmount,
          expenseId,
        };

        const txnResult = await createTxn(txnData);

        if (txnResult.success) {
          toast({
            title: "success",
            description: "Expense amount saved successfuly",
          });
          router.push("/admin/expenses");
        }
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          name="description"
          control={form.control}
          label="Description"
          placeholder="Enter a short description of the expenditure..."
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="expenseAmount"
          control={form.control}
          label="Amount"
          placeholder="Ksh"
        />
        <SubmitButton
          className="book-form_btn text-white mt-3 "
          isSubmitting={form.formState.isSubmitting}
        >
          {" "}
          Save{" "}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default ExpenseForm;

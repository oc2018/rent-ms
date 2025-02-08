"use client";

import { expenseSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createExpense } from "@/lib/admin/actions/expense";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createTxn } from "@/lib/admin/actions/transactions";

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
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="expenseAmount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Amount" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit"> Save </Button>
      </form>
    </Form>
  );
};

export default ExpenseForm;

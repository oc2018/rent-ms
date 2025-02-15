"use client";

import { expenseSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "../ui/form";
import { createExpense } from "@/lib/admin/actions/expense";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createTxn } from "@/lib/admin/actions/transactions";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/lib/constants";
import SubmitButton from "../SubmitButton";
import FileUpload from "../FileUpload";
import { SelectItem } from "../ui/select";

const ExpenseForm = ({
  type,
  properties,
}: {
  type: "create" | "edit";
  properties: Property[];
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      expenseAmount: 0.0,
      receiptImgUrl: "",
      propertyId: "",
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
          router.push(`/admin/expenses/${expenseId}`);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-7 rounded-2xl"
      >
        <div className="flex flex-col gap-3 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="expenseAmount"
            control={form.control}
            label="Amount"
            placeholder="Ksh"
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="propertyId"
            control={form.control}
            label="Select the House Number"
            placeholder="Select House Number"
          >
            {properties.map((p) => (
              <SelectItem key={p.propertyId} value={p.propertyId}>
                {p.propertyNo}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="description"
            control={form.control}
            label="Description"
            placeholder="Enter a short description of the expenditure..."
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="receiptImgUrl"
            control={form.control}
            label="Upload a picture of the receipt if availlable"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a picture of the receipt"
                  folder="receipts-pics"
                  variant="light"
                  onFileChange={field.onChange}
                />
              </FormControl>
            )}
          />
        </div>

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

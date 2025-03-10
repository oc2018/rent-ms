"use client";

import { paymentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { createPayment } from "@/lib/admin/actions/payments";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/lib/constants";
import { SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";
import { createTxn } from "@/lib/admin/actions/transactions";
import { getPropertyNo } from "@/lib/admin/actions/properties";

const PaymentForm = ({ type, tenants, allProperties }: PaymentProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      tenantId: "",
      propertyId: "",
      rentPaid: 0,
      depositPaid: 0,
    },
  });

  const fetchPropertyForTenant = async (tenantId: string) => {
    try {
      const res = await fetch("/api/fetchproperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tenantId }),
      });
      if (!res.ok) throw new Error("Server error");
      const result = await res.json();
      form.setValue("propertyId", result.propertyId);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  };

  const tenantId = form.watch("tenantId");

  useEffect(() => {
    if (tenantId) {
      fetchPropertyForTenant(tenantId);
    }
  }, [tenantId]);

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    if (type === "create") {
      const result = await createPayment(values);

      if (result.success) {
        const { paymentId, propertyId, rentPaid, depositPaid } = result.data;
        const propertyNo = await getPropertyNo(propertyId);

        const txnData = {
          description: `Payment of ${
            rentPaid ? "Rent" : "Deposit"
          } for house Number: ${propertyNo}.`,
          transactionAmount: rentPaid + depositPaid,
          isDebit: false,
          paymentId,
        };

        const txnResult = await createTxn(txnData);

        if (txnResult.success) {
          toast({
            title: "Success",
            description: "Payment saved successfully",
          });

          router.push("/admin/rentaccount");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-col w-full justify-between md:flex-row gap-3">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="tenantId"
              label="Select the Tenant"
              placeholder="Tenant"
            >
              {tenants.map((tenant, i) => (
                <SelectItem key={i + 1} value={tenant.id}>
                  <p>{tenant?.fullName}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="propertyId"
              label="House Number"
              placeholder="House Number"
            >
              {allProperties.map((property, i) => (
                <SelectItem key={i} value={property?.propertyId}>
                  <p>{property?.propertyNo}</p>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>
          <div className="flex flex-col w-full justify-between md:flex-row gap-3">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="rentPaid"
              label="Rent Paid"
              placeholder="Ksh"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="depositPaid"
              label="Deposit Paid"
              placeholder="Ksh"
            />
          </div>
        </div>

        <SubmitButton
          className="book-form_btn text-white mt-3"
          isSubmitting={form.formState.isSubmitting}
        >
          Save
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PaymentForm;

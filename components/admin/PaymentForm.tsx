"use client";

import { paymentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createPayment } from "@/lib/admin/actions/payments";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const PaymentForm = ({ type }: { type: "create" | "edit" }) => {
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

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    if (type === "create") {
      const result = await createPayment(values);

      if (result.success) {
        toast({
          title: "Success",
          description: "Payment saved successfully",
        });

        router.push("/admin/rentaccount");
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
          control={form.control}
          name="tenantId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tenant</FormLabel>
              <FormControl>
                <Input placeholder="tenant " {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <FormControl>
                <Input placeholder="property " {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rentPaid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent Paid</FormLabel>
              <FormControl>
                <Input placeholder="Ksh " {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="depositPaid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit Paid</FormLabel>
              <FormControl>
                <Input placeholder="Ksh " {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default PaymentForm;

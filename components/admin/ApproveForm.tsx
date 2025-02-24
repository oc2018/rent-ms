"use client";
import { ApproveSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/lib/constants";
import { SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";
import { allocateProperty } from "@/lib/admin/actions/rent";
// import Loading from "./Loading";

const ApproveForm = ({
  data,
  setOpen,
}: {
  data: User;
  setOpen: (open: boolean) => void;
}) => {
  const [vacant, setVacant] = useState<
    { propertyNo: string; propertyId: string }[]
  >([]);
  // const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ApproveSchema>>({
    resolver: zodResolver(ApproveSchema),
    defaultValues: {
      propertyId: "",
      status: "PENDING",
    },
  });

  const onSubmit = async (values: z.infer<typeof ApproveSchema>) => {
    // setIsLoading(true);
    try {
      const { propertyId, status } = values;
      const { id: tenantId } = data;
      const result = await allocateProperty({ propertyId, tenantId, status });
      if (result?.success) {
        console.log("approved");
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setIsLoading(false);
      setOpen(false);
    }
  };

  type Status = "PENDING" | "APPROVED" | "REJECTED";

  const statuses: Status[] = ["PENDING", "APPROVED", "REJECTED"];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/vacantproperties");
        if (!res.ok) throw new Error("sever error");
        const result = await res.json();
        setVacant(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

  return (
    // <>
    // {isLoading ? (
    // <Loading />
    // ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="status"
            label="Approve or Reject the new tenant"
          >
            {statuses.map((status, i) => (
              <SelectItem key={i + 1} value={status}>
                {status}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="propertyId"
          label="Select a vacant property"
          placeholder="Properties"
        >
          {vacant?.map((house, i) => (
            <SelectItem key={i + 1} value={house.propertyId}>
              {house.propertyNo}
            </SelectItem>
          ))}
        </CustomFormField>

        <SubmitButton
          isSubmitting={form.formState.isSubmitting}
          className="bg-primary-admin w-full mt-5 font-bold text-xl text-white"
        >
          Approve
        </SubmitButton>
      </form>
    </Form>
    // )}
    // </>
  );
};

export default ApproveForm;

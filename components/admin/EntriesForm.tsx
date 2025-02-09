"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { propertiesSchema } from "@/lib/validations";
import FileUpload from "../FileUpload";
import { createProperty } from "@/lib/admin/actions/proprties";
import CustomFormField from "../CustomFormField";
import { FormFieldType, propertySizes } from "@/lib/constants";
import { SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";

interface Props extends Partial<Property> {
  type?: "create" | "update";
}

const EntriesForm = ({ type }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    defaultValues: {
      propertyId: "",
      propertySize: "",
      propertyLocation: "",
      propertyImage: "",
      rent: 0,
      deposit: 0,
      status: "VACANT",
    },
  });

  async function onSubmit(values: z.infer<typeof propertiesSchema>) {
    if (type === "create") {
      const result = await createProperty(values);

      if (result.success) {
        toast({
          title: "Success",
          description: "Property details saved successfully",
        });

        router.push(`/admin/properties/${result.data.propertyId}`);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex flex-col md:flex-row w-full gap-3 mb-3">
          <div className="flex flex-col w-full justify-between gap-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="propertyId"
              label="Property Number"
              placeholder="oc/945-taita-nkuene/001"
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="propertySize"
              label="Property Size"
              placeholder="Studio"
            >
              {propertySizes.map((size, i) => (
                <SelectItem key={i + 1} value={size}>
                  {size}
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="rent"
              label="RentCharged"
              placeholder="KSH"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="deposit"
              label="Deposit Charged"
              placeholder="KSH"
            />
          </div>
          <div className="flex flex-col w-full justify-between gap-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="propertyLocation"
              label="Property Location"
              placeholder="Nkubu/945-taita-nkuene"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="propertyImage"
              label="A picture of the property"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUpload
                    type="image"
                    accept="image/*"
                    Placeholder="Upload a picture"
                    folder="property-pics"
                    variant="light"
                    onFileChange={field.onChange}
                  />
                </FormControl>
              )}
            />
          </div>
        </div>

        <SubmitButton
          className="book-form_btn text-white mt-3"
          isSubmitting={form.formState.isSubmitting}
        >
          Save Details
        </SubmitButton>
      </form>
    </Form>
  );
};

export default EntriesForm;

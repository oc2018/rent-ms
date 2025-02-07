"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { propertiesSchema } from "@/lib/validations";
import { Button } from "../ui/button";
import FileUpload from "../FileUpload";
import { createProperty } from "@/lib/admin/actions/proprties";
// import { createProperty } from "@/lib/actions/appwrite.actions";

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

        router.push(`/admin/properties/${result.data.id}`);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"propertyId"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-baase font-normal text-dark-500">
                Property Number
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  {...field}
                  placeholder="Property Number"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"propertySize"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base font-normal text-dark-500">
                Property Size
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  {...field}
                  placeholder="Property Size"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"propertyLocation"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-baase font-normal text-dark-500">
                Property Location
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  {...field}
                  placeholder="Property Location"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rent"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-baase font-normal text-dark-500">
                Rent Charnged
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  {...field}
                  placeholder="Rent Charged"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"deposit"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-baase font-normal text-dark-500">
                Deposit Paid
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  {...field}
                  placeholder="Deposit Paid"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"propertyImage"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-baase font-normal text-dark-500">
                Picture
              </FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="book-form_btn text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default EntriesForm;

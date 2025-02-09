/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormFieldType } from "@/lib/constants";
import Image from "next/image";
import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  addStyles?: string;
  iconAlt?: string;
  disabled?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const {
    fieldType,
    iconAlt,
    iconSrc,
    placeholder,
    // showTimeSelect,
    // dateFormat,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border ">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              className="ml-2 width-auto"
            />
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="book-form_input"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="min-h-14 book-form_input">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="book-form_input">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="book-form_input bg-inherit h-52"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.PASSWORD:
      return (
        <div className="flex rounded-md ">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type="password"
              className="book-form_input"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.EMAIL:
      return (
        <div className="flex rounded-md ">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2 width-auto"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type="email"
              className="book-form_input"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return <FormControl></FormControl>;

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
  }
};
const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <div className="w-full">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;

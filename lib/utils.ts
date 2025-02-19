import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const dateFormatter = (today: Date | string) => {
  today = new Date(today);
  return `${today.getDate()} - ${
    today.getMonth() + 1
  } - ${today.getFullYear()}`;
};

export const currencyFormatter = (amount: number) => {
  const ksh = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  return ksh.format(amount).replace("KES", "");
};

export const addZeros = (no: number) => {
  if (no.toString().length == 1) {
    return `00${no}`;
  } else if (no.toString().length == 2) {
    return `0${no}`;
  } else {
    return `${no}`;
  }
};

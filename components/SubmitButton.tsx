"use client";

import Image from "next/image";
import { Button } from "./ui/button";

const SubmitButton = ({
  isSubmitting,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={className ?? "w-full mt-3"}
    >
      {isSubmitting ? (
        <Image
          src="/icons/admin/loader.svg"
          width={24}
          height={24}
          alt="loader icon"
          className="animate-spin"
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;

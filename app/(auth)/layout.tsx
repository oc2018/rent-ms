import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const authLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image
              className="rounded-sm"
              src={"/icons/logo.png"}
              alt="Ontime"
              width={37}
              height={37}
            />
            <h1 className="text-2xl font-semibold text-white">
              Ontime Rentals
            </h1>
          </div>
          <div className="">{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src={"/images/auth-illustration.png"}
          alt="Ontime Rentals"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default authLayout;

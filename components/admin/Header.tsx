import { Session } from "next-auth";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/auth";
import Search from "../Search";
import { createSchedule } from "@/lib/admin/actions/qstash";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl text-dark-500 font-semibold">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">Monitor your tenants here</p>
      </div>
      <div>
        <div className="flex gap-3 justify-center items-center">
          <Search />
          <form
            action={async () => {
              "use server";
              await createSchedule();
              // await signOut();
            }}
          >
            <Button variant="ghost" className="text-red">
              Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;

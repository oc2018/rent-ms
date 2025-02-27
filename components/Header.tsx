import React from "react";
import { Session } from "next-auth";
import ProfileLink from "./ProfileLink";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { signOut } from "@/auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 text-white flex w-full justify-between gap-5">
      <Logo />
      <div className="flex flex-row items-center gap-3">
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <Button variant="ghost">Logout</Button>
        </form>
        <ProfileLink session={session} />
        <div className="flex flex-col">
          <div className="text-md font-bold">{session?.user?.name}</div>
          <div className="text-xs">{session?.user?.email}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;

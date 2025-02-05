import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl text-dark-500 font-semibold">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">Monitor your tenants here</p>
      </div>
      <p>Search</p>
    </header>
  );
};

export default Header;

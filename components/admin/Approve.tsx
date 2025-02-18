"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import ApproveForm from "./ApproveForm";

const Approve = ({ data }: { data: User }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Approve</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-3 text-12-semibold">
          <DialogTitle>Approve new Tenant</DialogTitle>
          <DialogDescription>Approve and allocate the house.</DialogDescription>
        </DialogHeader>
        <ApproveForm data={data} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default Approve;

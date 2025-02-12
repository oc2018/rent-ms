"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getUser = async (owner: string) => {
  (await db
    .select({ fullName: users.fullName })
    .from(users)
    .where(eq(users.id, owner))) as { fullName: string }[];
};

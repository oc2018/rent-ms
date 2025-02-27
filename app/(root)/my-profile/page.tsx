import { auth } from "@/auth";
import ProfileCard from "@/components/ProfileCard";
import { db } from "@/database/drizzle";
import { allocation, users } from "@/database/schema";
import { getPropertyNo } from "@/lib/admin/actions/properties";
import { eq } from "drizzle-orm";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("You are not authenticated");
  }
  const id = session.user.id as string;

  const userDetails = (await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phoneNumber: users.phoneNumber,
      idNumber: users.idNumber,
      idCard: users.idCard,
      kraPin: users.kraPin,
      status: users.status,
      role: users.role,
      lastActivityDate: users.lastActivityDate,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, id))) as User[];

  const [allocated] = (await db
    .select()
    .from(allocation)
    .where(eq(allocation.tenantId, id))
    .limit(1)) as allocation[];

  const propertyNo = await getPropertyNo(allocated?.propertyId);

  const allUserDetails = [
    {
      ...userDetails[0],
      propertyNo: propertyNo,
      rentDue: allocated?.rentDue,
      depositDue: allocated?.depositDue,
      rentStatus: allocated?.rentStatus,
    },
  ];
  return (
    <>
      <section className="w-full rounded-2xl p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">My Profile</h2>
        </div>
        <ProfileCard userDetails={allUserDetails} />
      </section>
    </>
  );
};

export default page;

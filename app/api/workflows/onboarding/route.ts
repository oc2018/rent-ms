// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import path from "path";
import fs from "fs";
import { generateLeasePdf } from "@/lib/generateLeasePdf";
// import { eq } from "drizzle-orm";

// type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

// const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
// const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
// const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

// const getUserState = async (email: string): Promise<UserState> => {
//   const user = await db
//     .select()
//     .from(users)
//     .where(eq(users.email, email))
//     .limit(1);

//   if (user.length === 0) return "non-active";

//   const lastActivityDate = new Date(user[0].lastActivityDate!);
//   const now = new Date();
//   const timeDifference = now.getTime() - lastActivityDate.getTime();

//   if (
//     timeDifference > THREE_DAYS_IN_MS &&
//     timeDifference <= THIRTY_DAYS_IN_MS
//   ) {
//     return "non-active";
//   }

//   return "active";
// };

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;
  await context.run("new-signup", async () => {
    try {
      const filePath = path.join(
        process.cwd(),
        "public/emails/welcome-email.html"
      );
      let emailTemplate = fs.readFileSync(filePath, "utf8");

      emailTemplate = emailTemplate.replace("${fullName}", fullName);

      const pdfPath = await generateLeasePdf({ fullName });

      //welcome Email
      await sendEmail({
        email,
        subject: "Welcome to Ontime Rental",
        message: emailTemplate,
        attachmentPath: pdfPath,
      });

      // return new Response(
      //   JSON.stringify({ message: "Email sent successfully" }),
      //   { status: 200 }
      // );
    } catch (error) {
      console.error("Error sending email", error);
      // return new Response(JSON.stringify({ error: "Failed to send Email" }), {
      //   status: 500,
      // });
    }
  });

  // await context.sleep("Wait-for-3-days", 60 * 60 * 24 * 3);

  // while (true) {
  //   const state = await context.run("check-user-state", async () => {
  //     return await getUserState(email);
  //   });

  //   if (state === "non-active") {
  //     await context.run("send-email-non-active", async () => {
  //       await sendEmail({
  //         subject: "Email to non-active users",
  //         email,
  //         message: `We miss You ${fullName}!`,
  //       });
  //     });
  //   } else if (state === "active") {
  //     await context.run("send-email-active", async () => {
  //       await sendEmail({
  //         subject: "Welcome back!",
  //         email,
  //         message: `Welcome back ${fullName}`,
  //       });
  //     });
  //   }

  //   await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  // }
});

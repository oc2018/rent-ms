import { updateRentMonthly } from "@/lib/admin/actions/rent";
import { db } from "@/database/drizzle";
import { allocation, users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
import { currencyFormatter } from "@/lib/utils";

// type userStatus = "non-active" | "active";

const day = new Date();
const month = day.getMonth() + 1;
const year = day.getFullYear();

// const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
// const ONE_MONTH = 30 * ONE_DAY_IN_MS;
const ONE_MONTH = 1000 * 60 * 60;

const getUserStatus = async (tenantId: string) => {
  const user = await db
    .select({ status: users.status, id: users.id })
    .from(users)
    .where(eq(users.id, tenantId));

  if (!user.length || ["PENDING", "REJECTED", null].includes(user[0]?.status))
    return "non-active";

  if (user[0]?.status === "APPROVED")
    return { status: "active", tenantId: user[0]?.id };
};

const getRentdue = async (tenantId: string) => {
  return await db
    .select({ rentDue: allocation.rentDue })
    .from(allocation)
    .where(eq(allocation.tenantId, tenantId));
};

export const { POST } = serve(async (context) => {
  const tenants = await db.select().from(users).where(eq(users.role, "USER"));

  const [tenantId] = tenants.map((tenant) => tenant.id);
  const [email] = tenants.map((tenant) => tenant.email);
  const [fullName] = tenants.map((tenant) => tenant.email);

  const status = await context.run("check-if-tenant", async () => {
    return await getUserStatus(tenantId);
  });

  if (!status || status === "non-active") return;

  const rentDue = await context.run("get-rent-due", async () => {
    return await getRentdue(status.tenantId);
  });

  const rentAmount = rentDue.length > 0 ? rentDue[0].rentDue : 0;

  if (status.status === "active") {
    await context.run("add-monthly-rent", async () => {
      return await updateRentMonthly();
    });
    await context.run("", async () => {
      await sendEmail({
        subject: "Monthly rent notice",
        email,
        message: `
          <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Monthly Rent Notice</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; }
                    .container { max-width: 600px; margin: 20px auto; padding: 20px; }
                    .header { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                    .content { margin: 25px 0; }
                    .highlight { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
                    .button { 
                        background-color: #3498db; 
                        color: white; 
                        padding: 12px 25px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        margin: 10px 0;
                    }
                    .footer { font-size: 0.9em; color: #666666; margin-top: 30px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Ontime Consultants</h1>
                        <h2>Monthly Rent Payment Reminder</h2>
                    </div>

                    <div class="content">
                        <p>Dear ${fullName},</p>

                        <p>This is a friendly reminder that your rent payment for <strong>${month} / ${year}</strong> is now due.</p>

                        <div class="highlight">
                            <p><strong>Payment Details:</strong></p>
                            <ul>
                                <li>Amount Due: ${currencyFormatter(
                                  rentAmount
                                )}</li>
                                <li>Due Date: 10 - ${month} - ${year} </li>
                                <li>Late Fee After Due Date: 10% / month </li>
                            </ul>
                        </div>

                        <p><strong>Payment Methods:</strong></p>
                        <ol>
                            // <li>Online Portal: <a href="[Payment Portal URL]" class="button">Pay Online Now</a></li>
                            <li>Bank Transfer: NCBA LOOP </li>
                            <li>Acc NO: 0720965996 </li>
                            <li>Mpesa: 0720965996 </li>
                        </ol>

                        <p>Please ensure your payment is received by the due date to avoid late fees. 
                        Contact us immediately if you anticipate any payment delays.</p>

                        <p>Best regards,<br>
                        Eric Ndege<br>
                        Ontime Consultants<br>
                        0720956996<br>
                        </p>
                    </div>

                    <div class="footer">
                        <p>Nkubu - Mitunguu RD<br>
                        0720965996 | eric@ericndege.com | www.ericndege.com</p>
                        <p>© ${year} Ontime Consultants. All rights reserved.</p>
                        
                    </div>
                </div>
            </body>
            </html>
          `,
      });

      console.log("cron job run...");
    });
  }

  await context.sleep("wait-for-one-month", ONE_MONTH);
});

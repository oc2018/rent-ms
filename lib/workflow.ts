import { Client as QstashClient, resend } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import fs from "fs";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QstashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
  attachmentPath,
}: sendEmailProps) => {
  const attachments: {
    filename: string;
    content: string;
    contentType: string;
  }[] = [];

  if (attachmentPath) {
    try {
      const pdfData = fs.readFileSync(attachmentPath);
      const base64Pdf = pdfData.toString("base64");

      attachments.push({
        filename: "Lease-Agreement.pdf",
        content: base64Pdf,
        contentType: "application/pdf",
      });
    } catch (error) {
      console.error("Error reading PDF file: ", error);
    }
  }
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Eric <eric@ericndege.com>",
      to: [email],
      subject,
      html: message,
      attachments,
    },
  });
};

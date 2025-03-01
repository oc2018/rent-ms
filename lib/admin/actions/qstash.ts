"use server";

import config from "@/lib/config";
import { Client } from "@upstash/qstash";

const qstash = new Client({ token: config.env.upstash.qstashToken as string });

export async function createSchedule() {
  try {
    const response = await qstash.schedules.create({
      destination: `${config.env.apiProdEndpoint}/api/updaterentmonthly`,
      body: JSON.stringify({ message: "Monthly rent Updated" }),
      cron: "0 0 1 * *",
    });

    console.log("Schedule created:", response);
  } catch (error) {
    console.log(error);
  }
}

createSchedule();

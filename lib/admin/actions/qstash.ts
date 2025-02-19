import config from "@/lib/config";
import { Client } from "@upstash/qstash";

const qstash = new Client({ token: config.env.upstash.qstashToken as string });

export async function createSchedule() {
  try {
    const response = await qstash.schedules.create({
      destination: `${config.env.apiProdEndpoint}/api/workflows/rent`,
      body: JSON.stringify({ message: "Hello from Qstash" }),
      cron: "* * * * *",
    });

    console.log("Schedule created:", response);
  } catch (error) {
    console.log(error);
  }
}

createSchedule();

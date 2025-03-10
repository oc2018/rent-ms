import { updateRentMonthly } from "@/lib/admin/actions/rent";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "nodejs",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Received request", req.method);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("cron triggered");
    const result = await updateRentMonthly();
    console.log("cron successful");
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to update with error: ${error}` });
  }
}

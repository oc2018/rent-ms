import { updateRentMonthly } from "@/lib/admin/actions/rent";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await updateRentMonthly();
    return { success: true, message: result };
  } catch (error) {
    return { success: false, error };
  }
}

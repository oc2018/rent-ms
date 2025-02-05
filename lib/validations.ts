import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(5),
  email: z.string().email(),
  idNumber: z.coerce.number().min(6, { message: "Enter a valid ID Number" }),
  idCard: z.string().nonempty("ID card is required"),
  phoneNumber: z.string().min(10),
  kraPin: z.string(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const propertiesSchema = z.object({
  propertyId: z.string().min(1),
  propertySize: z.string().min(3),
  propertyLocation: z.string().min(3),
  propertyImage: z.string().nonempty("Image is required"),
  // propertyOwner: z.string().min(1),
  rent: z.coerce.number().min(3),
  deposit: z.coerce.number().min(3),
  status: z.enum(["VACANT", "OCCUPIED"]),
});

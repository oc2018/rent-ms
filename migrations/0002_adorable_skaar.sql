ALTER TABLE "payments" ALTER COLUMN "payment_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_id_unique" UNIQUE("payment_id");
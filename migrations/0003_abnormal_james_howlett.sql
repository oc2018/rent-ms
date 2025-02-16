CREATE TYPE "public"."rent_status" AS ENUM('CLEARED', 'DUE', 'OVERDUE', 'DEFAULTED');--> statement-breakpoint
ALTER TABLE "allocation" ADD COLUMN "rent_status" "rent_status" DEFAULT 'DUE';
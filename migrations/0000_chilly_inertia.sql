-- CREATE TYPE "public"."property_status" AS ENUM('VACANT', 'OCCUPIED');--> statement-breakpoint
-- CREATE TYPE "public"."role" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
-- CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "expenses" (
	"expense_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expense_no" serial NOT NULL,
	"description" text NOT NULL,
	"expense_amount" real DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"receiptNo" serial NOT NULL,
	"tenant_id" uuid NOT NULL,
	"property_id" varchar NOT NULL,
	"rentPaid" real DEFAULT 0,
	"depositPaid" real DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "payments_payment_id_unique" UNIQUE("payment_id")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"property_id" varchar(255) PRIMARY KEY NOT NULL,
	"property_size" varchar(255) NOT NULL,
	"property_location" varchar(255) NOT NULL,
	"property_image" text NOT NULL,
	"property_owner" uuid NOT NULL,
	"rent" integer DEFAULT 0 NOT NULL,
	"deposit" integer DEFAULT 0 NOT NULL,
	"property_status" "property_status",
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"transaction_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_id" uuid,
	"expense_id" uuid,
	"description" text NOT NULL,
	"transaction_amount" real DEFAULT 0,
	"is_debit" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"national_id" integer NOT NULL,
	"password" text NOT NULL,
	"id_card" text NOT NULL,
	"kra_pin" text NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"role" "role" DEFAULT 'USER',
	"last_activity_date" date DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_property_owner_users_id_fk" FOREIGN KEY ("property_owner") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payment_id_payments_payment_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("payment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_expense_id_expenses_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expenses"("expense_id") ON DELETE no action ON UPDATE no action;
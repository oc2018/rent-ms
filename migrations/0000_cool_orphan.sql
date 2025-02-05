CREATE TYPE "public"."property_status" AS ENUM('VACANT', 'OCCUPIED');--> statement-breakpoint
DROP TYPE IF EXISTS role;
CREATE TYPE "public"."role" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
DROP TYPE IF EXISTS status;
CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
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
ALTER TABLE "properties" ADD CONSTRAINT "properties_property_owner_users_id_fk" FOREIGN KEY ("property_owner") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
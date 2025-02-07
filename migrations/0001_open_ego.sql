CREATE TABLE "payments" (
	"payment_id" uuid PRIMARY KEY NOT NULL,
	"receiptNo" serial NOT NULL,
	"tenant_id" uuid NOT NULL,
	"property_id" varchar NOT NULL,
	"rentPaid" real DEFAULT 0,
	"depositPaid" real DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;
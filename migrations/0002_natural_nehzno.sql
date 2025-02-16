CREATE TABLE "allocation" (
	"allocation_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"tenant_it" uuid,
	"rent_due" integer NOT NULL,
	"deposit_due" integer,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_tenant_it_users_id_fk" FOREIGN KEY ("tenant_it") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
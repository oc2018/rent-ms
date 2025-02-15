ALTER TABLE "expenses" ADD COLUMN "receipt_img_url" text;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "property_id" uuid;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;
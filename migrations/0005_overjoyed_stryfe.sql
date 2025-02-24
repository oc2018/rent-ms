ALTER TABLE "allocation" RENAME COLUMN "tenant_it" TO "tenant_id";--> statement-breakpoint
ALTER TABLE "allocation" DROP CONSTRAINT "allocation_tenant_it_users_id_fk";
--> statement-breakpoint
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
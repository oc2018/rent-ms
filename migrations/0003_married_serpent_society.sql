CREATE TABLE "expenses" (
	"expense_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expense_no" serial NOT NULL,
	"description" text NOT NULL,
	"expense_amount" real DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"transaction_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"expense_id" uuid,
	"transaction_amount" real DEFAULT 0,
	"is_debit" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_tenant_id_payments_payment_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."payments"("payment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_expense_id_expenses_expense_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expenses"("expense_id") ON DELETE no action ON UPDATE no action;
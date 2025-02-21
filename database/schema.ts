import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  real,
  serial,
  boolean,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["ADMIN", "USER"]);

export const PROPERTY_STATUS_ENUM = pgEnum("property_status", [
  "VACANT",
  "OCCUPIED",
]);

export const RENT_STATUS_ENUM = pgEnum("rent_status", [
  "CLEARED",
  "DUE",
  "OVERDUE",
  "DEFAULTED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").notNull(),
  idNumber: integer("national_id").notNull(),
  password: text("password").notNull(),
  idCard: text("id_card").notNull(),
  kraPin: text("kra_pin").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").notNull().defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const properties = pgTable("properties", {
  propertyId: uuid("property_id").notNull().primaryKey().defaultRandom(),
  propertyNo: varchar("property_no", { length: 255 }),
  propertySize: varchar("property_size", { length: 255 }).notNull(),
  propertyLocation: varchar("property_location", { length: 255 }).notNull(),
  propertyImage: text("property_image").notNull(),
  propertyOwner: uuid("property_owner")
    .references(() => users.id)
    .notNull(),
  rent: integer("rent").notNull().default(0),
  deposit: integer("deposit").notNull().default(0),
  status: PROPERTY_STATUS_ENUM("property_status"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const payments = pgTable("payments", {
  paymentId: uuid("payment_id").notNull().primaryKey().defaultRandom().unique(),
  receiptNo: serial(),
  tenantId: uuid("tenant_id")
    .references(() => users.id)
    .notNull(),
  propertyId: uuid("property_id")
    .references(() => properties.propertyId)
    .notNull(),
  rentPaid: real().default(0.0),
  depositPaid: real().default(0.0),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const expenses = pgTable("expenses", {
  expenseId: uuid("expense_id").primaryKey().defaultRandom(),
  expenseNo: serial("expense_no"),
  receiptImgUrl: text("receipt_img_url"),
  propertyId: uuid("property_id").references(() => properties.propertyId),
  description: text("description").notNull(),
  expenseAmount: real("expense_amount").default(0.0),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const transactions = pgTable("transactions", {
  transactionId: uuid("transaction_id").notNull().defaultRandom().primaryKey(),
  paymentId: uuid("payment_id").references(() => payments.paymentId),
  expenseId: uuid("expense_id").references(() => expenses.expenseId),
  description: text("description").notNull(),
  transactionAmount: real("transaction_amount").default(0.0),
  isDebit: boolean("is_debit").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const allocation = pgTable("allocation", {
  allocationId: uuid("allocation_id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => properties.propertyId),
  tenantId: uuid("tenant_id").references(() => users.id),
  rentDue: integer("rent_due").notNull().default(0),
  depositDue: integer("deposit_due").default(0),
  rentStatus: RENT_STATUS_ENUM("rent_status").default("DUE"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

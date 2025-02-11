interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  idNumber: number;
  idCard: string;
  phoneNumber: string;
  kraPin: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  idNumber: number;
  // password: string;
  idCard: string;
  kraPin: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  lastActivityDate: string;
  createdAt: Date | null;
}

interface PropertyParams {
  propertyId: string;
  propertySize: string;
  propertyLocation: string;
  propertyImage: string;
  rent: number;
  deposit: number;
  status: "VACANT" | "OCCUPIED";
}

interface Property {
  propertyId: string;
  propertySize: string;
  propertyLocation: string;
  propertyImage: string;
  propertyOwner: string;
  rent: number;
  deposit: number;
  status: "VACANT" | "OCCUPIED";
  createdAt: Date | null;
}

interface PaymentParams {
  tenantId: string;
  propertyId: string;
  rentPaid?: number;
  depositPaid?: number;
}
interface Payment {
  paymentId: string;
  receiptNo: number;
  tenantId: string;
  propertyId: string;
  rentPaid?: number | null;
  depositPaid?: number | null;
  createdAt: Date | null;
}

interface ExpenseParams {
  description: string;
  expenseAmount: number;
}

interface Expense {
  expenseId: string;
  expenseNo: number;
  description: string;
  expenseAmount: number | null;
  createdAt: Date | null;
}

interface TxnProps {
  description: string;
  isDebit: boolean;
  transactionAmount: number;
  receiptNo?: number;
  expenseNo?: number;
}

interface Txn {
  transactionId: string;
  description: string;
  paymentId: string | null;
  expenseId: string | null;
  transactionAmount: number | null;
  isDebit: boolean;
  createdAt: Date | null;
}

interface SubmitButtonProps {
  isSubmitting: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface PaymentListProps {
  paymentId: string;
  receiptNo: number;
  propertyId: string;
  rentPaid: number | null | undefined;
  depositPaid: number | null | undefined;
  tenant: string;
  createdAt: Date | null;
}

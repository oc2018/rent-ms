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
  role: "ADMIN" | "USER";
  // password: string;
  idCard: string;
  kraPin: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  lastActivityDate: string;
  createdAt: Date | null;
}

interface PropertyParams {
  propertyNo: string;
  propertySize: string;
  propertyLocation: string;
  propertyImage: string;
  rent: number;
  deposit: number;
  status: "VACANT" | "OCCUPIED";
}

interface Property {
  propertyId: string;
  propertyNo: string;
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

interface GetPaymentsTotalProps {
  rentPaid: number | null;
}

interface GetExpensesTotalProps {
  expenseAmount: number | null;
}

interface GetTenantsTotalProps {
  id: string;
}

interface GetDepositsTotalProps {
  depositPaid: number | null;
}

interface ExpenseParams {
  description: string;
  expenseAmount: number;
  receiptImgUrl?: string;
  propertyId?: string;
}

interface Expense {
  expenseId: string;
  expenseNo: number;
  description: string;
  receiptImgUrl?: string;
  propertyId?: string;
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

interface TxnList {
  balance: number;
  rowClass: string;
  createdAt: Date | null;
  description: string;
  isDebit: boolean;
  paymentNo: number | null;
  expenseNo: number | null;
  transactionAmount: number | null;
}

interface SubmitButtonProps {
  isSubmitting: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface PaymentListProps {
  propertyNo: string | null;
  paymentId: string;
  receiptNo: number;
  propertyId: string;
  rentPaid: number | null | undefined;
  depositPaid: number | null | undefined;
  tenant: string;
  createdAt: Date | null;
}

interface PropertyCardProps {
  propertyNo: string;
  propertySize: string;
  propertyImage: string;
  propertyLocation: string;
  propertyOwner: string;
  rent: number;
  deposit: number;
  status: "VACANT" | "OCCUPIED";
}

interface PaymentProps {
  type: "create" | "edit";
  tenants: User[];
  allProperties: Property[];
}

interface UserTxnListProps {
  paymentId: string;
  receiptNo: number;
  tenantId: string;
  propertyId: string;
  rentPaid: number | null;
  depositPaid: number | null;
  createdAt: Date | null;
}

interface ProfileCardProps {
  id: string;
  role: "ADMIN" | "USER";
  fullName: string;
  email: string;
  phoneNumber: string;
  idNumber: number;
  idCard: string;
  kraPin: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  lastActivityDate: string;
  createdAt: Date | null;
  propertyNo: string | null;
  rentDue: number;
  rentStatus: "CLEARED" | "DUE" | "OVERDUE" | "DEFAULTED";
}

interface allocationProps {
  propertyId: string;
  tenantId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface allocation {
  allocationId: string;
  propertyId: string;
  tenantId: string;
  rentDue: number;
  depositDue: number;
  rentStatus: "CLEARED" | "DUE" | "OVERDUE" | "DEFAULTED";
  createdAt: Date | null;
}

interface RentDueDataProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  rentDue: number;
  rentStatus: "CLEARED" | "DUE" | "OVERDUE" | "DEFAULTED" | null;
}

interface sendEmailProps {
  email: string;
  subject: string;
  message: string;
  attachmentPath?: string;
}

interface LeaseDetails {
  fullName: string;
  propertyNo?: string;
  moveInDate?: string;
  rentAmount?: string;
  depositAmount?: string;
}
// interface PropertiesListProps {
//   propertyId: string;
//   createdAt: Date | null;
//   deposit: number;
//   rent: number;
//   propertySize: string;
//   propertyLocation: string;
//   propertyImage: string;
//   propertyOwner: string;
//   status: string;
// }

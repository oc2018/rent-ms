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
  password: string;
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

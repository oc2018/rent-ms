interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  idNumber: number;
  idCard: string;
  phoneNumber: string;
  kraPin: string;
}

interface PropertyParams {
  propertyId: string;
  propertySize: string;
  propertyLocation: string;
  propertyImage: string;
  // propertyOwner: string;
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

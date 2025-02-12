export const FIELD_NAMES = {
  fullName: "Full Name",
  email: "Email",
  phoneNumber: "Phone Number",
  idNumber: "ID Number",
  idCard: "upload National ID Card",
  kraPin: "KRA Pin",
  password: "Password",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  phoneNumber: "text",
  idNumber: "number",
  kraPin: "text",
  password: "password",
};

export const PROPERTY_FIELD_NAMES = {
  propertyId: "Property Number",
  proretySize: "Property Size",
  propertyLocation: "Property Location",
  propertyImage: "Property Image",
  propertyOwner: "LandLord",
  rent: "Rent Charged",
};

export const PROPERTY_FIELD_TYPES = {};

export const adminSidebarLinks = [
  {
    icon: "/icons/admin/home.svg",
    text: "Dashboad",
    route: "/admin",
  },
  {
    icon: "/icons/admin/home.svg",
    text: "Rent Account",
    route: "/admin/rentaccount",
  },
  {
    icon: "/icons/admin/users.svg",
    text: "Tenants",
    route: "/admin/tenants",
  },
  {
    icon: "/icons/admin/home.svg",
    text: "Properties",
    route: "/admin/properties",
  },
  {
    icon: "/icons/admin/home.svg",
    text: "Expenses",
    route: "/admin/expenses",
  },
  {
    icon: "/icons/admin/receipt.svg",
    text: "Transactions",
    route: "/admin/transactions",
  },
  // { icon: "/icons/admin/user.svg", text: "LandLord", route: "/admin/landlord" },
];

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
  EMAIL = "email",
}

export const propertySizes = [
  "Studio",
  "Single Room",
  "Two Bedrooms",
  "Three Bedrooms",
  "Four Bedrooms",
  "Five Bedrooms",
];

export const StatusIcon = {
  APPROVED: "/icons/tick.svg",
  OCCUPIED: "/icons/tick.svg",
  REJECTED: "/icons/warning.svg",
  PENDING: "/icons/tick.svg",
  VACANT: "/icons/tick.svg",
};

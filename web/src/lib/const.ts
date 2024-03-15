export const authorizedRole = ["admin"];
export const adminRole = ["admin"];

export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "guest", label: "Guest" },
];

export const roleMapper = (role: string) => roleOptions.find((option) => option.value === role)?.label ?? "Unknown Role"

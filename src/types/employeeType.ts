export interface EmployeeType {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  userTag: string;
  department: string;
  position: string;
  birthday: string;
  phone: string;
}

export interface EmployeesResponse {
  items: EmployeeType[];
}

export type Department =
  | "android"
  | "ios"
  | "design"
  | "management"
  | "qa"
  | "back_office"
  | "frontend"
  | "hr"
  | "pr"
  | "backend"
  | "support"
  | "analytics";

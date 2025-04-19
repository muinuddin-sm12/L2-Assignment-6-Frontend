export interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  role: "customer" | "provider" | "admin";
  isActive?: boolean;
  iat?: number;
  exp?: number;
}

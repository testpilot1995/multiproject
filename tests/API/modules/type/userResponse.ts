import { User } from "./user";

export interface UserResponse extends User {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}
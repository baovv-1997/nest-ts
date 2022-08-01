import { Role } from "../schemas/user.schema";

export interface IDataSign {
  uid: string;
  email: string;
  role: Role;
}
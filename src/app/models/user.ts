import { UserExpense } from "./user-expense";

export interface User {
   userID: number;
   userName: string;
   userEmail:string;
   userPassword:string;
   expenses?: UserExpense[];
}

import { Category } from "./category";
import { User } from "./user";

export interface UserExpense {
   
expenseID: number;
  title: string;
  amount: number;
  date: string;          
  userID: number;
  categoryID: number;
  categoryName: string;
   
}

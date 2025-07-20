import { Category } from "./category";
import { User } from "./user";

export interface UserExpense {
  expenseID?: number;
  title: string;
  amount: number;
  date: string;
  user: Partial<User>;           // Only userID needed for submission
  category: Category;            // At least categoryID needed
}
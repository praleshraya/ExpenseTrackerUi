import { Category } from "./category";

// user-expense.ts
// user-expense.ts
export interface UserExpense {
  expenseID?: number;
  title: string;
  amount: number;
  date: string;
  user: {
    userID: number;
  };
  category: {
    categoryID: number;
    categoryName?: string; 
  };
}



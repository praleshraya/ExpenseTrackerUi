import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserExpense } from '../models/user-expense';
import { User } from '../models/user';
import { UserExpenseList } from '../components/user-expense-list/user-expense-list';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class UserExpenseService {
 userExpenseApi = 'http://localhost:8080/expenses';
  categoriesApi = 'http://localhost:8080/categories';
  constructor(private http:HttpClient){}

 


  getAllExpensesByUser(userId: number): Observable<UserExpense[]> {
    console.log(`${userId}`);
    return this.http.get<UserExpense[]>(`${this.userExpenseApi}/users/${userId}`);
//  return this.http.get<UserExpense[]>(this.userExpenseApi + '/users/' + userId);
  }

  createUserExpense(userExpense: UserExpense): Observable<UserExpense>{
    return this.http.post<UserExpense>(this.userExpenseApi,userExpense)
  }

  updateUserExpense(expenseID:number, expense:UserExpense) : Observable<UserExpense>
  {
    return this.http.put<UserExpense>(this.userExpenseApi.concat('/users/'+expenseID), expense);
  }

   getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesApi);
  }

 
}
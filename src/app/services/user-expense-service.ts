import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserExpense } from '../models/user-expense';
import { User } from '../models/user';
import { UserExpenseList } from '../components/user-expense-list/user-expense-list';
import { Category } from '../models/category';
import { UserExpenseDtoModule } from '../models/user-expense-dto/user-expense-dto-module';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserExpenseService {

  

//   getAllExpensesByUser: any;
//   constructor(private http:HttpClient){}

//   createUserExpense(expense: UserExpense): Observable<UserExpense> 
//   {
//     return this.http.post<UserExpense>(this.userExpenseApi, expense);
//   }


//   updateUserExpense(expenseID:number, expense:UserExpense) : Observable<UserExpense>
//   {
//     return this.http.put<UserExpense>(this.userExpenseApi.concat('/users/'+expenseID), expense);
//   }

//    getCategories(): Observable<Category[]> {
//     return this.http.get<Category[]>(this.categoriesApi);
//   }
//   import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { UserExpense } from '../models/user-expense';

@Injectable({
  providedIn: 'root'
})
export class UserExpenseService {
   userExpenseApi = 'http://localhost:8080/expenses';
  categoriesApi = 'http://localhost:8080/categories';

  httpOptions ={
    headers: new Headers( {
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  // Get all expenses by user ID
  getExpensesByUser(userID: number): Observable<UserExpenseDtoModule[]> {
    return this.http.get<UserExpenseDtoModule[]>(this.userExpenseApi.concat("/users/")+userID);
  }

  // Create a new expense
//   createUserExpense(expense: UserExpense): Observable<UserExpense> {
//   return this.http.post<UserExpense>('http://localhost:8080/expenses', expense);
// }

  createUserExpense(expense: UserExpense): Observable<string> {
    return this.http.post<string>(this.userExpenseApi.concat("/add"), expense, { responseType: 'text' as 'json' });

  }

  // Update an existing expense
  // updateUserExpense(expenseID: number, expense: UserExpense): Observable<UserExpense> {
  //   return this.http.put<UserExpense>(`${this.userExpenseApi}/users/${expenseID}`, expense);
  // }

  updateUserExpense(expenseID: number, expense: UserExpense): Observable<UserExpense> {
  return this.http.put<UserExpense>(this.userExpenseApi.concat('/users/').concat(expenseID.toString()), expense);
}


deleteUserExpense(expenseID: number): Observable<void> {
  return this.http.delete<void>(this.userExpenseApi.concat('/users/').concat(expenseID.toString()));
}
  // Get categories (as an example)
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesApi);
  }
}




//   getAllExpensesByUser(userId: number): Observable<UserExpense[]> {
//     console.log(`${userId}`);
//     return this.http.get<UserExpense[]>(`${this.userExpenseApi}/users/${userId}`);
// //  return this.http.get<UserExpense[]>(this.userExpenseApi + '/users/' + userId);
//   }

  // createUserExpense(userExpense: UserExpense): Observable<UserExpense>{
  //   return this.http.post<UserExpense>(this.userExpenseApi,userExpense)
  // }

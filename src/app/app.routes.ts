import { Routes } from '@angular/router';


import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { UserExpenseService } from './services/user-expense-service';
import { UserExpenseList } from './components/user-expense-list/user-expense-list';
import { AddNewExpense } from './components/add-new-expense/add-new-expense';
import { CategoryComponent } from './components/category-component/category-component';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'signup', component: Signup },
    { path: 'login', component: Login },
    { path: 'expenses/users/:userID', component: UserExpenseList },
    { path: 'addExpense/:userID', component: AddNewExpense },
    { path: 'addExpense/:userID/:expenseID', component: AddNewExpense },
    { path: 'editExpense/:userID/:expenseID', component: AddNewExpense },
    { path: 'create-category', component: CategoryComponent },
    { path: 'profile', component: Profile },
    
    
];

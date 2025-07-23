import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserExpenseDtoModule {
    expenseID?: number;
  title: string;
  amount: number;
  date: string;
  userID: number;
  categoryID: number;
  categoryName: string;
    
 }

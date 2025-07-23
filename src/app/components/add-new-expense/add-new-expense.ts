import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { UserExpenseService } from '../../services/user-expense-service';
import { UserExpense } from '../../models/user-expense';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar-component/navbar-component';

@Component({
  selector: 'app-add-new-expense',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NavbarComponent, RouterModule],
  templateUrl: './add-new-expense.html',
  styleUrl: './add-new-expense.css',
  standalone: true
})
export class AddNewExpense implements OnInit {
  addNewExpenseForm: FormGroup;
  expenseID: number = 0;
  userID: number = 0;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userExpenseService: UserExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addNewExpenseForm = this.formBuilder.group({
      title: ['', Validators.required],
      amount: ['0', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      categoryID: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('userID');
    const expenseID = this.route.snapshot.paramMap.get('expenseID');

    this.userID = userID ? parseInt(userID, 10) : 0;
    this.expenseID = expenseID ? parseInt(expenseID, 10) : 0;

    this.loadCategories();

    if (this.expenseID) {
      this.userExpenseService.getExpensesByUser(this.userID).subscribe((expenses: UserExpense[]) => {
        const expense = expenses.find(exp => exp.expenseID === this.expenseID);
        if (expense) {
          this.addNewExpenseForm.patchValue({
            title: expense.title,
            amount: expense.amount,
            date: expense.date?.substring(0, 10),
            categoryID: expense.categoryID,

          });
        }
      });
    }
  }


  loadCategories() {
    this.userExpenseService.getCategories().subscribe((result: Category[]) => {
      this.categories = result;
    });
  }




  // if (this.expenseID) {
  //   this.userExpenseService.getExpensesByUser(this.userID).subscribe((expenses: UserExpense[]) => {
  //     const expense = expenses.find(exp => exp.expenseID === this.expenseID);
  //     if (expense) {
  //       this.addNewExpenseForm.patchValue({
  //         title: expense.title,
  //         amount: expense.amount,
  //         date: expense.date,
  //         categoryID: expense.category.categoryID
  //       });
  //     }
  //   });
  // }


  // createUserExpense() {

  //   if (this.addExpenseForm.valid) {
  //     const formValue = this.addExpenseForm.value;

  //   const formValue = this.addNewExpenseForm.value;

  //   const selectedCategory = this.categories.find(cat => cat.categoryID === +formValue.categoryID);

  //   const newExpense: UserExpense = {
  //     title: formValue.title,
  //     amount: formValue.amount,
  //     date: formValue.date,
  //     user: { userID: this.userID },
  //     category: selectedCategory!
  //   };

  //   this.userExpenseService.createUserExpense(newExpense).subscribe((result: string) => {
  //     if (result) {
  //       alert("Expense Created");
  //       // this.router.navigate([`/expenses/users/${this.userID}`]);
  //       // this.router.navigate['/addExpense'+this.userID]
  //       // this.router.navigate(['/expenses/users', this.userID]);
  //         this.router.navigate(['expenses/users/:userID']);
  //     } else {
  //       alert("Error occurred");
  //     }
  //   });
  // }

  // createUserExpense() {
  //   if (this.addNewExpenseForm.valid) {
  //     const formValue = this.addNewExpenseForm.value;

  //     const payload = {
  //       title: formValue.title,
  //       amount: formValue.amount,
  //       date: formValue.date,
  //       user: {
  //         userID: this.userID,
  //       },
  //       category: {
  //         categoryID: formValue.categoryID
  //       }
  //     };

  //     if (this.expenseID) {
  //       // Edit mode
  //       this.userExpenseService.updateUserExpense(this.expenseID, payload).subscribe(() => {
  //         alert("Expense updated successfully.");
  //         this.router.navigate(['/expenses/users', this.userID]);
  //       });
  //     } else {
  //       // Create mode
  //       this.userExpenseService.createUserExpense(payload).subscribe(() => {
  //         alert("Expense created successfully.");
  //         this.router.navigate(['/expenses/users', this.userID]);
  //       });
  //     }
  //   }
  // }

  createUserExpense() {

    if (this.addNewExpenseForm.valid) {
      const formValue = this.addNewExpenseForm.value;

      const payload = {
        title: formValue.title,
        amount: formValue.amount,
        date: formValue.date,
        user: {
          userID: this.userID,
        },
        category: {
          categoryID: formValue.categoryID
        }
      };


      if (this.addNewExpenseForm.valid) {
        const formValue = this.addNewExpenseForm.value;

        const payload = {
          title: formValue.title,
          amount: formValue.amount,
          date: formValue.date,
          user: {
            userID: this.userID,
          },
          categoryID: formValue.categoryID,
  categoryName: formValue.categoryName
        };

        if (this.expenseID) {
          // Edit mode
          this.userExpenseService.updateUserExpense(this.expenseID, payload).subscribe(() => {
            alert("Expense updated successfully.");
            this.router.navigate(['/expenses/users', this.userID]);
          });
        } else {
          // Create mode
          this.userExpenseService.createUserExpense(payload).subscribe(() => {
            alert("Expense created successfully.");
            this.router.navigate(['/expenses/users', this.userID]);
          });
        }
      }
    }


  }


}


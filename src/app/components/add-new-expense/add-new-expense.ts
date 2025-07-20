import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserExpenseService } from '../../services/user-expense-service';
import { UserExpense } from '../../models/user-expense';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-expense',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-expense.html',
  styleUrl: './add-new-expense.css',
standalone:true
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
    // this.userID = Number(this.route.snapshot.paramMap.get('userID'));
  this.userID = parseInt(this.route.snapshot.paramMap.get('userID') || '', 10);
    this.expenseID = Number(this.route.snapshot.paramMap.get('expenseID'));

    
    this.userExpenseService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });

    if (this.expenseID) {
      this.userExpenseService.getExpensesByUser(this.userID).subscribe((expenses: UserExpense[]) => {
        const expense = expenses.find(exp => exp.expenseID === this.expenseID);
        if (expense) {
          this.addNewExpenseForm.patchValue({
            title: expense.title,
            amount: expense.amount,
            date: expense.date,
            categoryID: expense.category.categoryID
          });
        }
      });
    }
  }

  createUserExpense(): void {
    const formValue = this.addNewExpenseForm.value;

    const selectedCategory = this.categories.find(cat => cat.categoryID === +formValue.categoryID);

    const newExpense: UserExpense = {
      title: formValue.title,
      amount: formValue.amount,
      date: formValue.date,
      user: { userID: this.userID },
      category: selectedCategory!
    };

    this.userExpenseService.createUserExpense(newExpense).subscribe((result: UserExpense) => {
      if (result) {
        alert("Expense Created");
        // this.router.navigate([`/expenses/users/${this.userID}`]);
        // this.router.navigate['/addExpense'+this.userID]
        this.router.navigate(['/expenses/users', this.userID]);
      } else {
        alert("Error occurred");
      }
    });
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { UserExpense } from '../../models/user-expense';
import { FormBuilder } from '@angular/forms';
import { UserExpenseService } from '../../services/user-expense-service';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-expense-list',
  imports: [CommonModule, DatePipe],
  templateUrl: './user-expense-list.html',
  styleUrl: './user-expense-list.css'
})
export class UserExpenseList implements OnInit {
  expenses: UserExpense[] = [];
    userID!: number;
     username: string = '';

  constructor(
    private userExpenseService: UserExpenseService,
    private route: ActivatedRoute,
    private router:Router,
     private cdr: ChangeDetectorRef,
     private userService:UserService
  ) {}


  ngOnInit(): void {
    // Debugging the userID retrieval from the route
    const userIDFromRoute = this.route.snapshot.paramMap.get('userID');
    console.log('userIDFromRoute:', userIDFromRoute);  // Check if userID is coming from the route

        this.username = this.userService.getUsername();

    if (userIDFromRoute) {
      this.userID = Number(userIDFromRoute);
      if (this.userID > 0) {
        console.log('Valid userID:', this.userID);  // Log the valid userID
        this.loadExpenses();
      } else {
        console.error('Invalid User ID:', this.userID);
      }
    } else {
      console.error('No userID found in route');
    }
  }

  //   ngOnInit(): void {
  //   this.userID = Number(this.route.snapshot.paramMap.get('userID'));
  //   console.log('User ID:', this.userID)
  //   this.loadExpenses();
  // }

  loadExpenses(): void {
  console.log('Fetching expenses for userID:', this.userID);
  this.userExpenseService.getAllExpensesByUser(this.userID).subscribe(
    (data) => {
      console.log('Fetched Expenses:', data);
      this.expenses = data;

      // Explicitly trigger change detection
      this.cdr.detectChanges();  // Manually trigger change detection
    },
    (error) => {
      console.error('Error loading expenses:', error);
    }
  );
}

  // loadExpenses(): void {
  //   this.userExpenseService.getAllExpensesByUser(this.userID).subscribe(
  //     (data) => {
  //       this.expenses = data;
  //     },
  //     (error) => {
  //       console.error('Error loading expenses:', error);
  //     }
  //   );
  // }
  // loadExpenses(): void {
  //   this.userExpenseService.getAllExpensesByUser(this.userID).subscribe(data => {
  //     console.log('Fetched Expenses:', data); 
  //     this.expenses = data;
  //   },
  // error => {
  //   console.error('Error loading expenses:', error); // Log any errors
  // });
  // }


  addNewExpense(): void {
  this.router.navigate(['/addExpense']);
}
}

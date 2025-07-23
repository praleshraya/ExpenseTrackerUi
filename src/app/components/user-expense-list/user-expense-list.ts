import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserExpense } from '../../models/user-expense';
import { UserExpenseService } from '../../services/user-expense-service';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from '../navbar-component/navbar-component';
import { Subscription } from 'rxjs';
import { UserExpenseDtoModule } from '../../models/user-expense-dto/user-expense-dto-module';

@Component({
  selector: 'app-user-expense-list',
  imports: [CommonModule, DatePipe, NavbarComponent],
  templateUrl: './user-expense-list.html',
  styleUrl: './user-expense-list.css',
  standalone: true
})
export class UserExpenseList implements OnInit, OnDestroy {
  expenses: UserExpenseDtoModule[] = [];
  userID!: number;
  username: string = '';
  routeSub!: Subscription;

  constructor(
    private userExpenseService: UserExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this.username = this.userService.getUsername();  // Now this will work
  this.userID = this.userService.getLoggedInUserID();
    // Subscribe to route param changes
    this.routeSub = this.route.paramMap.subscribe(params => {
      const userIDFromRoute = params.get('userID');
      console.log('userIDFromRoute:', userIDFromRoute);

      this.userID = userIDFromRoute ? Number(userIDFromRoute) : 0;

      if (this.userID > 0) {
        this.loadExpenses();
      } else {
        console.error('Invalid or missing userID');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe(); //  prevent memory leaks
    }
  }

  loadExpenses(): void {
  this.userExpenseService.getExpensesByUser(this.userID).subscribe({
    next: (result) => {
      console.log('Expenses fetched:', result);
      this.expenses = result;
      this.cdr.detectChanges(); // optional
    },
    error: (error) => {
      console.error('Error fetching expenses:', error);
    }
  });
}
  // loadExpenses(): void {
  //   this.userExpenseService.getExpensesByUser(this.userID).subscribe(
  //     result => {
  //       console.log('Expenses fetched:', result);
  //       this.expenses = result;
  //       this.cdr.detectChanges(); // optional, forces UI update
  //     },
  //     error => {
  //       console.error('Error fetching expenses:', error);
  //     }
  //   );
  // }

  addNewExpense(): void {
    this.router.navigate(['addExpense', this.userID]);
  }

  editExpense(dto: UserExpenseDtoModule): void {
    const expense: UserExpense = {
    expenseID: dto.expenseID,
    title: dto.title,
    amount: dto.amount,
    date: dto.date,
    user: {
      userID: dto.userID
    },
    category: {
      categoryID: dto.categoryID
    }
  };
    this.router.navigate(['/editExpense', this.userID, expense.expenseID]);
  }

  deleteExpense(expenseID: number): void {
    const confirmed = confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
      this.userExpenseService.deleteUserExpense(expenseID).subscribe({
        next: () => {
          alert('Expense deleted successfully.');
          this.loadExpenses(); 
        },
        error: err => {
          console.error('Error deleting expense:', err);
          alert('Failed to delete expense.');
        }
      });
    }
  }
}





            // My old version 

// import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { User } from '../../models/user';
// import { HttpClient } from '@angular/common/http';
// import { UserExpense } from '../../models/user-expense';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { UserExpenseService } from '../../services/user-expense-service';
// import { UserService } from '../../services/user-service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule, DatePipe } from '@angular/common';
// import { NavbarComponent } from '../navbar-component/navbar-component';


// @Component({
//   selector: 'app-user-expense-list',
//   imports: [CommonModule, DatePipe, NavbarComponent],
//   templateUrl: './user-expense-list.html',
//   styleUrl: './user-expense-list.css'
// })
// export class UserExpenseList implements OnInit, OnDestroy {
//   expenses: UserExpense[] = [];
//     userID!: number;
//      username: string = '';
//   routeSub: any;

//   constructor(
//     private userExpenseService: UserExpenseService,
//     private route: ActivatedRoute,
//     private router:Router,
//      private cdr: ChangeDetectorRef,
//      private userService:UserService
//   ) {}


//   ngOnInit(): void {
//     // Debugging the userID retrieval from the route
//     // const userIDFromRoute = this.route.snapshot.paramMap.get('userID');

//     this.routeSub = this.route.paramMap.subscribe(params => {
//     const userIDFromRoute = params.get('userID');
//     this.userID = userIDFromRoute ? Number(userIDFromRoute) : 0;

//     this.loadExpenses(); //  Called every time param changes

//     console.log('userIDFromRoute:', userIDFromRoute);  // Check if userID is coming from the route

//         this.username = this.userService.getUsername();

//     if (userIDFromRoute) {
//       this.userID = Number(userIDFromRoute);

//       if (this.userID > 0) {
//         console.log('Valid userID:', this.userID);  // Log the valid userID
//         this.loadExpenses();
//       } else {
//         console.error('Invalid User ID:', this.userID);
//       }
//     } else {
//       console.error('No userID found in route');
//     }
//   });
    
//   }

//   ngOnDestroy(): void {
//     if(this.routeSub){
//       this.routeSub.unsubscribe();
//     }
//   }

//   //   ngOnInit(): void {
//   //   this.userID = Number(this.route.snapshot.paramMap.get('userID'));
//   //   console.log('User ID:', this.userID)
//   //   this.loadExpenses();
//   // }

// //   loadExpenses(): void {
// //   console.log('Fetching expenses for userID:', this.userID);
// //   this.userExpenseService.getAllExpensesByUser(this.userID).subscribe(
// //     (data) => {
// //       console.log('Fetched Expenses:', data);
// //       this.expenses = data;

// //       // Explicitly trigger change detection
// //       this.cdr.detectChanges();  // Manually trigger change detection
// //     },
// //     (error) => {
// //       console.error('Error loading expenses:', error);
// //     }
// //   );
// // }

//   // loadExpenses(): void {
//   //   this.userExpenseService.getExpensesByUser(this.userID).subscribe(result =>{
//   //     this.expenses = result
//   //   });
//   // }
//   loadExpenses(): void {
//   this.userExpenseService.getExpensesByUser(this.userID).subscribe(
//     result => {
//       console.log('Expenses fetched:', result); //
//       this.expenses = result;
//     },
//     error => {
//       console.error('Error fetching expenses:', error);
//     }
//   );
// }
//   // loadExpenses(): void {
//   //   this.userExpenseService.getAllExpensesByUser(this.userID).subscribe(data => {
//   //     console.log('Fetched Expenses:', data); 
//   //     this.expenses = data;
//   //   },
//   // error => {
//   //   console.error('Error loading expenses:', error); // Log any errors
//   // });
//   // }


//   addNewExpense(): void {
//   // this.router.navigate['/addExpense/:userID'];
//     this.router.navigate(['addExpense',this.userID]);
// }

// editExpense(expense: UserExpense): void {
//   this.router.navigate(['/editExpense', this.userID, expense.expenseID]);
// }


// deleteExpense(expenseID: number): void {
//   const confirmed = confirm("Are you sure you want to delete this expense?");
//   if (confirmed) {
//     this.userExpenseService.deleteUserExpense(expenseID).subscribe({
//       next: () => {
//         alert("Expense deleted successfully.");
//         this.loadExpenses(); // Refresh list after deletion
//       },
//       error: (err) => {
//         console.error("Error deleting expense:", err);
//         alert("Failed to delete expense.");
//       }
//     });
//   }
// }




// }



import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { UserExpenseService } from './services/user-expense-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule, FontAwesomeModule

    ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers:[UserExpenseService],
  standalone: true
})
export class App {
  protected title = 'expenseTrackerUI';


}
  
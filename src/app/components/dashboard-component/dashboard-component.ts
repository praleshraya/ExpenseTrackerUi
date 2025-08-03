import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar-component/navbar-component';
import { DashboardService } from '../../services/dashboard-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  imports: [FormsModule, ReactiveFormsModule,NavbarComponent,CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
  standalone:true
})
export class DashboardComponent {
  userId: number = 1;  // Set this dynamically based on the logged-in user
  totalExpenses: number = 0;
  categoryTotals: Map<string, number> = new Map();
  dateTotals: Map<string, number> = new Map();
  dateRangeTotals: Map<string, number> = new Map();
  startDate: string = '2025-01-01'; 
  endDate: string = '2025-12-31';         
  username: string='';

  constructor(private dashboardService: DashboardService) {}

ngOnInit(): void {
  this.loadData();
  const state = window.history.state;
  this.username = state?.username || 'Guest';
}


   
  loadData(): void {
    this.getTotalExpenses();
    this.getExpenseByCategory();
    this.getExpenseByDate();
    this.getExpenseByRange();
    const userId = this.username; 

  }

  // Get total expenses
  getTotalExpenses(): void {
    this.dashboardService.getTotalExpenses(this.userId).subscribe(
      (total) => {
        this.totalExpenses = total;
      },
      (error) => {
        console.error('Error fetching total expenses', error);
      }
    );
  }

  // Get expenses by category
  getExpenseByCategory(): void {
    this.dashboardService.getExpenseByCategory(this.userId).subscribe(
      (categoryTotals) => {
        this.categoryTotals = categoryTotals;
      },
      (error) => {
        console.error('Error fetching expenses by category', error);
      }
    );
  }

  // Get expenses by date (today, this month, this year)
  getExpenseByDate(): void {
    this.dashboardService.getExpenseByDate(this.userId).subscribe(
      (dateTotals) => {
        this.dateTotals = dateTotals;
      },
      (error) => {
        console.error('Error fetching expenses by date', error);
      }
    );
  }

  // Get expenses by custom date range
  // getExpenseByRange(): void {
  //   this.dashboardService.getExpenseByRange(this.userId, this.startDate, this.endDate).subscribe(
  //     (dateRangeTotals) => {
  //       this.dateRangeTotals = dateRangeTotals;
  //     },
  //     (error) => {
  //       console.error('Error fetching expenses by date range', error);
  //     }
  //   );
  // }

    getExpenseByRange(): void {
    this.dashboardService.getExpenseByRange(this.userId, this.startDate, this.endDate).subscribe(
      (dateRangeTotals) => {
        this.dateRangeTotals = dateRangeTotals;
      },
      (error) => {
        console.error('Error fetching expenses by date range', error);
      }
    );
  }


}

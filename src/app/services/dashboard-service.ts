import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/expenses';  // Your backend API URL

  constructor(private http: HttpClient) { }

  // Get total expenses for a user
  getTotalExpenses(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total/${userId}`);
  }

  // Get expenses by category for a user
  getExpenseByCategory(userId: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/category/${userId}`);
  }

  // Get expenses by date (day, month, year) for a user
  getExpenseByDate(userId: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/date/${userId}`);
  }

  // Get expenses by date range for a user
  getExpenseByRange(userId: number, startDate: string, endDate: string): Observable<Map<string, number>> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
      
    return this.http.get<Map<string, number>>(`${this.apiUrl}/range/${userId}`, { params });
  }
  
}

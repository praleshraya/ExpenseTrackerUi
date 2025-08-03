import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   constructor(private http: HttpClient) {}
     categoriesApi = 'http://localhost:8080/categories';

       httpOptions ={
    headers: new Headers( {
      'Content-Type':'application/json'
    })
  }

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesApi);
  }

    createNewCategory(category: Category): Observable<string> {
      return this.http.post(this.categoriesApi, category, { responseType: 'text' as const});
    }
 
  
}

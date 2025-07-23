import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar-component/navbar-component';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-component',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './category-component.html',
  styleUrl: './category-component.css',
  standalone:true
})
export class CategoryComponent  implements OnInit{

    addCategoryForm!: FormGroup;

  constructor(
       private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
  ){  }

  ngOnInit(): void {
  this.addCategoryForm = this.formBuilder.group({
      newCategory: ['', Validators.required]
    });
  }

  createCategory() {
  const category = {
    categoryName: this.addCategoryForm.value.newCategory
  };

  this.categoryService.createNewCategory(category).subscribe({
    next: (data) => {
      alert('Category created successfully!');
      this.router.navigate(['/addExpense/1']);  // use actual values
    },
    error: (err) => {
      alert('Error creating category');
      console.error(err);
    }
  });
}


  // createCategory(){
  //      const category: Category = {
  //     categoryID: 0, // backend will likely auto-generate
  //     categoryName: this.addCategoryForm.value.newCategory
  //   };

  //   this.categoryService.createNewCategory(category).subscribe({
  //     next: (data) => {
  //       alert('Category created successfully!');
  //       this.router.navigate(['/addExpense/:userID/:expenseID']);  // or return to previous page
  //     },
  //     error: (err) => {
  //       alert('Error creating category');
  //       console.error(err);
  //     }
  //   });
  // }



}

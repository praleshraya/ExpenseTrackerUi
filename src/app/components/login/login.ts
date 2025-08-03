import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserExpense } from '../../models/user-expense';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {


  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    //constructor
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    })
  }

  loginFunction(): void {
    const user = this.loginForm.value;
    this.userService.loginFunction(user).subscribe((user: User) => {
      if (user.userID) {
        this.userService.setLoggedInUser(user);
        this.userService.setUsername(user.userName);
        alert("Login Successful")
        this.router.navigate(['/expenses/users', user.userID]);
      }
      else {
        alert("Invalid username or password.")
      }
    })
  }

  gotoSignup(): void {
    this.router.navigate['signup'];
  }



}










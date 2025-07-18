import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';


@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  signupForm: FormGroup;

  constructor(private fb:FormBuilder, private userService:UserService, private router: Router){}

  userID: number;


  ngOnInit():void{
    this.signupForm = this.fb.group({
    userName: ['',Validators.required],
   userEmail:['',Validators.required],
   userPassword:['',Validators.required],
    })
  }

  // signupFunction():void{
  //   const user = this.signupForm.value;
  //   this.userService.signupFunction(user).subscribe((result:string)=>{
  //     if(result ==="User created Successfully"){
  //       return this.router.navigate(['login']);
  //     }
  //     else{
  //       alert("Unable to register user !");
  //     }
  //   })
  // }

//   signupFunction(): void {
//   const user = this.signupForm.value;

//   this.userService.signupFunction(user).subscribe({
//     next: (result: string) => {
//       if (result === "User created Successfully") {
//         this.router.navigate(['login']);
//       } else {
//         alert("Unable to register user!");
//       }
//     },
//     error: (error) => {
//       console.error("Signup error:", error);
//       alert("An error occurred during signup.");
//     }
//   });
// }
 
signupFunction(): void {
  const user = this.signupForm.value;

  this.userService.signupFunction(user).subscribe(
  (result: string) => {
    if (result === "User created Successfully") {
      alert("User created Successfully")
      this.router.navigate(['login']);
    } else {
      alert("Unable to register user!");
    }
  }
);
}

}

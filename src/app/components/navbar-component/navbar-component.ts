import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule

  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
  standalone:true
})
export class NavbarComponent {
  name:string;
  constructor(private router:Router, private userService: UserService){ 
     this.name = this.userService.getUsername();
  }

  logout():void{
    this.router.navigate(['/login']);
  }
    
}

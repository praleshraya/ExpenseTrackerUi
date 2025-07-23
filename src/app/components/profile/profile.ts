import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar-component/navbar-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  standalone:true
})
export class Profile implements OnInit{

  user: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  

}

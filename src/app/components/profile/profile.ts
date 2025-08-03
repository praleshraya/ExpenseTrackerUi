import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar-component/navbar-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule,FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  standalone:true
})
export class Profile implements OnInit{

  // for password change:
    oldPassword: string = '';
  newPassword: string = '';
   confirmPassword: string = '';

  user: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
  }
   updateProfile(): void {
    if (this.user) {
      this.userService.updateUserProfile(this.user.userID, {
        userName: this.user.userName,
        userEmail: this.user.userEmail
      }).subscribe({
        next: (updated) => {
          alert('Profile updated successfully');
          this.userService.setLoggedInUser(updated); // Update local user info
        },
        error: (err) => {
          console.error(err);
          alert('Failed to update profile');
        }
      });
    }
  }

  updatePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    if (this.user) {
      this.userService.changePassword(this.user.userID, this.oldPassword, this.newPassword).subscribe({
        next: () => {
          alert('Password updated successfully');
          this.oldPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: (err) => {
          alert('Failed to change password: ' + (err.error || 'Unknown error'));
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  

}

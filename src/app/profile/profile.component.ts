import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  showPasswordForm: boolean = false;
  passwordForm: any = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  message: string = '';
  passwordUpdated: boolean = false; 

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  togglePasswordForm(): void {
    this.showPasswordForm = !this.showPasswordForm;
  }

  updatePassword(): void {
    this.authService.updatePassword(this.currentUser.username, this.passwordForm)
      .subscribe(
        response => {
          this.message = response.message;
          setTimeout(() => {
            this.message = '';
          }, 3000)
           // Assuming backend returns an object with a 'message' key
          this.passwordUpdated = true; // Set passwordUpdated to true on successful password update
          // Reset the form
          this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          };
        },
        error => {
          this.message = error.error.message;
          setTimeout(() => {
            this.message = '';
          }, 3000);  // Assuming backend returns an error with an object containing a 'message' key
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  resetEmail: string = '';
  isForgotPasswordRequested = false;

  emailForReset: string = '';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  image = 'C:\\Users\\Mohamed\\azurePfeFront\\src\\assets\\images\\background.jpg';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        if (this.roles.includes('ROLE_USER')) {
          this.router.navigate(['/home/architecture']);
        } else if (this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/home/dashbord']);
        } 
      },
      error: err => {
        this.errorMessage = 'Incorrect password.';
        this.isLoginFailed = true;
        this.clearErrorMessageAfterDelay();
      }
    });
  }

  clearErrorMessageAfterDelay(): void {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3500); 
  }

  reloadPage(): void {
    window.location.reload();
  }
}

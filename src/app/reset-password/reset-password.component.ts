import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email!: string;
  resetToken!: string;
  newPassword!: string;
  confirmPassword!: string;
  passwordsNotMatching: boolean = false;
  passwordsMatching: boolean = false;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['resetToken'];
      this.email = params['email'];
     
    });
  }

  
  resetPassword(): void {
    //console.log('Email:', this.email);
    //console.log('Reset Token:', this.resetToken);
    //console.log('New Password:', this.newPassword);
    //console.log('Confirm Password:', this.confirmPassword);

    if (this.newPassword !== this.confirmPassword) {
      console.log("Passwords do not match");
      this.passwordsNotMatching = true;
      
      return;
    }
  

    this.authService.resetPassword(this.email, this.resetToken, this.newPassword, this.confirmPassword).subscribe(
      data => {
        console.log(data);
        this.passwordsNotMatching = true
        this.passwordsMatching = true;
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
        
      }
    );
  }
}
import { AuthService } from '../_services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email!: string;
  message: string = '';
  messageClass: string = '';

  constructor(private authService: AuthService) { }

  forgotPassword(): void {
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        // Traitez ici la réponse en cas de succès
        this.message = 'Email sent successfully.';
        this.messageClass = 'alert-success';
        console.log(response);
        this.clearMessageAfterDelay();
      },
      error => {
        // Traitez ici l'erreur
        this.message = 'An error occurred. Please try again.';
        this.messageClass = 'alert-danger';
        console.error(error);
        this.clearMessageAfterDelay();
      }
    );
  }

  clearMessageAfterDelay(): void {
    setTimeout(() => {
      this.message = '';
    }, 3000); 
  }
}

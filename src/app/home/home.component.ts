import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  title = 'azurePfePlatform';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  isAdmin: boolean = false;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
  }
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      if (this.roles.includes('ROLE_ADMIN')) {
        this.isAdmin = true ;
      }

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }

  logout() {
    this.isAdmin= false;
    this.storageService.signOut();
    window.location.reload();
   
    
}
}
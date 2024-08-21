import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
const AUTH_API = 'http://52.160.91.188:8093/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

 
  private isLoggedInVar: boolean = false;
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    this.isLoggedInVar = true; // Définir isLoggedInVar à true avant la requête HTTP
  
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  getTotalUsers(): Observable<number> {
    return this.http.get<number>(AUTH_API + 'totalUsers');
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'forgot-password',
      { email },
      httpOptions
    );
  }
  
  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }


  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
    this.isLoggedInVar = false;

  }
  updatePassword(username: string, passwordData: any): Observable<any> {
    return this.http.put(
      AUTH_API + 'modifierPassword/' + username,
      passwordData,
      httpOptions
    );
  }

  resetPassword(email: string, resetToken: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'reset-password',
      {
        email,
        resetToken,
        password,
        confirmPassword // Ajouter confirmPassword
      },
      httpOptions
    );
  }
  resetPasswordS(email: string, resetToken: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'reset-password',
      { email, resetToken, password }
    );
  }

  getResetTokenByEmail(email: string): Observable<any> {
    return this.http.get(
      AUTH_API + 'token/' + email,
      httpOptions
    );
  }

  getEmailByUsername(username: string): Observable<any> {
    return this.http.get(`${AUTH_API}email?username=${username}`);
  }



}
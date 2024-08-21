import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



const API_URL = 'http://52.160.91.188:8093/api/applicationGateways/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationGatewayService {

  constructor(private http: HttpClient) { }

  createApplicationGateway(name :String, region:any, resourceGroupe:any, subnet:any,
    user:any): Observable<any> {
    return this.http.post(API_URL + 'add',{name, region,resourceGroupe,subnet
      ,user} , httpOptions);
  }

  getApplicationGateway(id: string): Observable<any> {
    return this.http.get(API_URL + 'get/' + id, httpOptions);
  }

  getAllApplicationGateways(): Observable<any> {
    return this.http.get(API_URL + 'getAll', httpOptions);
  }

  deleteApplicationGateway(id: string): Observable<any> {
    return this.http.delete(API_URL + '/' + id, httpOptions);
  }

  // Additional methods to interact with the API can be added here
}

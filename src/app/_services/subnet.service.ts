import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



const API_URL = 'http://52.160.91.188:8093/api/subnets/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubnetService {

  constructor(private http: HttpClient) { }

  createSubnet(subnet:any): Observable<any> {
    return this.http.post(API_URL + 'add', subnet, httpOptions);
  }

  getSubnet(id: string): Observable<any> {
    return this.http.get(API_URL + 'get/' + id, httpOptions);
  }

  getAllSubnets(): Observable<any> {
    return this.http.get(API_URL + 'getAll', httpOptions);
  }

  deleteSubnet(id: string): Observable<any> {
    return this.http.delete(API_URL + '/' + id, httpOptions);
  }

}

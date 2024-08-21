import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



const API_URL = 'http://52.160.91.188:8093/api/virtualNetworks/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VirtualNetworkService {

  constructor(private http: HttpClient) { }

 
  createVirtualNetwork(name: string, ipAddresses: string,  resourceGroup:any, region:any, user: any ): Observable<any> {
    return this.http.post(API_URL + 'add', { name, ipAddresses,  resourceGroup, region ,user }, httpOptions);
  }
  getVirtualNetwork(id: string): Observable<any> {
    return this.http.get(API_URL + 'get/' + id, httpOptions);
  }

  getAllVirtualNetworks(): Observable<any> {
    return this.http.get(API_URL + 'getAll', httpOptions);
  }

  deleteVirtualNetwork(id: string): Observable<any> {
    return this.http.delete(API_URL + '/' + id, httpOptions);
  }

  // Add more methods as needed
}

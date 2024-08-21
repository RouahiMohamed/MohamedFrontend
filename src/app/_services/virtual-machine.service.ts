import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



const API_URL = 'http://52.160.91.188:8093/api/virtualMachines/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VirtualMachineService {

  constructor(private http: HttpClient) { }

  getAllVirtualMachines(): Observable<any> {
    return this.http.get(API_URL + 'showAllVms', httpOptions);
  }

  getVirtualMachineById(id: string): Observable<any> {
    return this.http.get(API_URL + 'showVm/' + id, httpOptions);
  }

  createVirtualMachine(vm : any): Observable<any> {



// Use the constructed object in the POST request
return this.http.post(API_URL + 'addVm', vm, httpOptions);
}


  deleteVirtualMachineById(id: string): Observable<any> {
    return this.http.delete(API_URL + 'deleteVm/' + id, httpOptions);
  }

  // Additional methods to interact with your API can be added here
}

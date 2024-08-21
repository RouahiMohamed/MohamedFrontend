import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = 'http://52.160.91.188:8093/api/architectures/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})
export class ArchitectureService {

  constructor(private http: HttpClient) { }

  createArchitecture(architectureData: any): Observable<any> {
    return this.http.post(API_URL + 'add', architectureData, httpOptions);
  }  

  
  getArchitecture(id: string): Observable<any> {
    return this.http.get(API_URL + 'getById/' + id, httpOptions);
  }
  updateArchitecture(id: string, architectureData: any): Observable<any> {
    return this.http.put(API_URL +`update/${id}`, architectureData, httpOptions);
  }
  getAllArchitectures(): Observable<any> {
    return this.http.get(API_URL + 'getAll', httpOptions);
  }
  getUserArchitectures(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}archByUser/${userId}`);
  }
  deleteArchitecture(id: string): Observable<any> {
    return this.http.delete(API_URL + 'delete/' + id, httpOptions);
  }
  generatePulumiCode(architecture: any): Observable<any> {
    return this.http.post(API_URL +'generate-pulumi-code', architecture,{ responseType: 'text' });
  }
  generateTerraformCode(architecture: any): Observable<any> {
    return this.http.post(API_URL +'generate-terraform-code', architecture,{ responseType: 'text' });
  }
  estimateCosts(terraformCode: string): Observable<any> {
    return this.http.post(API_URL + 'estimateCost', { terraformDirectory: terraformCode }, httpOptions);
}
saveCostEstimation(architectureId: string, body: any): Observable<any> {
  return this.http.post(API_URL + `saveCostEstimation/${architectureId}`, body, httpOptions);
}

}
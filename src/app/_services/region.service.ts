import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


 
const API_URL = 'http://52.160.91.188:8093/api/Region/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RegionService {
 
  constructor(private http: HttpClient) {}
  getAllRegions(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'getAll');
  }

  getRegionById(id: string): Observable<any> {
    return this.http.get<any>(API_URL + 'getById/' + id);
  }
  addRegion(region: any): Observable<any> {
    return this.http.post<any>(API_URL + 'addRegion', region, httpOptions);
  }
  
  deleteRegion(id: string): Observable<void> {
    return this.http.delete<void>(API_URL + id);
  }
  
  updateRegion(id: string, updatedRegion: any): Observable<any> {
    return this.http.put<any>(API_URL + 'update/' + id, updatedRegion, httpOptions);
  }
  getRegionNameById(id: string): Observable<any> {
    return this.http.get<any>(API_URL + 'regions/' + id + '/name');
  }
}

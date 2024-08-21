import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



const API_URL = 'http://52.160.91.188:8093/api/diskSizes/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DiskSizeService {

  constructor(private http: HttpClient) { }

  getAllDiskSizes(): Observable<any> {
    return this.http.get(API_URL + 'getAll', httpOptions);
  }

  getDiskSizeById(id: string): Observable<any> {
    return this.http.get(API_URL + id, httpOptions);
  }

  saveDiskSize(diskSize: any): Observable<any> {
    return this.http.post(API_URL + 'addDiskSize', diskSize, httpOptions);
  }

  deleteDiskSizeById(id: string): Observable<any> {
    return this.http.delete(API_URL + id, httpOptions);
  }
  
  getDiskSizesByRegionId(regionId: any): Observable<any> {
    return this.http.get(API_URL + 'region/' + regionId, httpOptions);
  }
  updateDiskSize(id: string, updatedDiskSize: any): Observable<any> {
    return this.http.put(API_URL + `updateDiskSize/${id}`, updatedDiskSize, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchitectureDataService {
  private architectureData = new BehaviorSubject<any>(null);

  setArchitectureData(data: any) {
    this.architectureData.next(data);
  }

  getArchitectureData() {
    return this.architectureData.asObservable();
  }
}

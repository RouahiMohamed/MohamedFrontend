import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<any>(null);
  constructor() { }
  setFormData(data: any) {
    this.formDataSubject.next(data);
  }

  getFormData() {
    return this.formDataSubject.asObservable();
  }

private placedComponentsDataSubject = new BehaviorSubject<any>(null);

setPlacedComponentsData(data: any) {
  this.placedComponentsDataSubject.next(data);
}

getPlacedComponentsData() {
  return this.placedComponentsDataSubject.asObservable();
}
}
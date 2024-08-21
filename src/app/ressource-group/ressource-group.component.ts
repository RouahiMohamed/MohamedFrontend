import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { StorageService } from '../_services/storage.service';
import { FormDataService } from '../_services/form-data.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-ressource-group',
  templateUrl: './ressource-group.component.html',
  styleUrls: ['./ressource-group.component.css']
})
export class RessourceGroupComponent implements OnInit {
  regions: any[] = [];
  resourceGroupForm: FormGroup;
  currentUser: any;
  @Input() component: any;
  
  constructor(
    private localStorage: LocalStorageService,
    public modalRef: MdbModalRef<RessourceGroupComponent>,
    private regionService: RegionService,
        private storageService: StorageService,
  ) {
    this.resourceGroupForm = new FormGroup({
    region: new FormControl('', Validators.required), 
      name: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required) 
    });
  }

  ngOnInit() :void{
   
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
    this.currentUser = this.storageService.getUser(); 
    if (this.currentUser && this.currentUser.id) {
      this.resourceGroupForm.get('user')?.setValue(this.currentUser.id);
    }
    // Use the component's id to retrieve its data from local storage
    const storedData = this.localStorage.retrieve('resourceGroupData' + this.component.id);
  if (storedData) {
    this.resourceGroupForm.patchValue(storedData);
  } else {
    this.resourceGroupForm.reset();
  }
}

  onSubmit() {
          const formData = this.resourceGroupForm.value;
      try {
        // Use the component's id to store its data in local storage
        this.localStorage.store('resourceGroupData' + this.component.id, formData);
        console.log(this.component.id, formData);
      } catch (error) {
        console.error('Error storing data in local storage:', error);
      }
      this.modalRef.close();
    
  }
}
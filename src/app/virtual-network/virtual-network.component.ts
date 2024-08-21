import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { VirtualNetworkService } from '../_services/virtual-network.service';
import { StorageService } from '../_services/storage.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormDataService } from '../_services/form-data.service';
import { ArchitectureDataService } from '../_services/architecture-data-service.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-virtual-network',
  templateUrl: './virtual-network.component.html',
  styleUrls: ['./virtual-network.component.css']
})
export class VirtualNetworkComponent implements OnInit {
  regions: any[] = [];
  resourceGroups: any[] = [];
  currentUser: any;
  virtualNetworkForm: FormGroup;
  @Input() component: any;
  @Input() placedComponents: any[] = []; 
  constructor(
    private localStorage: LocalStorageService,
    
    private regionService: RegionService,
   private storageService: StorageService, public modalRef: MdbModalRef<VirtualNetworkComponent>,
  ) {
    this.virtualNetworkForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ipAddresses: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      resourceGroup: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required) 
      
    });
  }

  ngOnInit(): void {
    this.loadRegions();
    this.loadResourceGroups();

    this.currentUser = this.storageService.getUser();
    if (this.currentUser && this.currentUser.id) {
      this.virtualNetworkForm.get('user')?.setValue(this.currentUser.id);
    }
    const storedData = this.localStorage.retrieve('virtualNetworkData' + this.component.id);
    if (storedData) {
      this.virtualNetworkForm.patchValue(storedData);
    } else {
      this.virtualNetworkForm.reset();
    }
  }
  
  
  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
  }
  
  loadResourceGroups(): void {
    this.resourceGroups = this.placedComponents.filter(component => component.type === 'ressourceGroup').map(component => {
        const data = this.localStorage.retrieve('resourceGroupData' + component.id);
        return { id: component.id, name: data.name };
    });
    console.log(this.resourceGroups);
}
 onSubmit() {
        const formData = this.virtualNetworkForm.value;
        const ressourceGroupDta = this.localStorage.retrieve('resourceGroupData' + formData.resourceGroup);
    formData.resourceGroup = ressourceGroupDta;
    try {
      // Use the component's id to store its data in local storage
      this.localStorage.store('virtualNetworkData' + this.component.id, formData);
      console.log(this.component.id, formData);
    } catch (error) {
      console.error('Error storing data in local storage:', error);
    }
    this.modalRef.close();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VirtualMachineService } from '../_services/virtual-machine.service';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { DiskSizeService } from '../_services/disk-size.service';
import { VMImageService } from '../_services/images.service';
import { SubnetService } from '../_services/subnet.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { StorageService } from '../_services/storage.service';
import { FormDataService } from '../_services/form-data.service';
import { ArchitectureDataService } from '../_services/architecture-data-service.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-virtual-machine',
  templateUrl: './virtual-machine.component.html',
  styleUrls: ['./virtual-machine.component.css']
})
export class VirtualMachineComponent implements OnInit {
  virtualMachineForm: FormGroup;
  regions: any[] = [];
  images: any[] = [];
  diskSizes: any[] = [];
  resourceGroups: any[] = [];
  currentUser: any;
  subnets: any[] = [];
  @Input() component: any; 
  @Input() placedComponents: any[] = []; 
  @Output() vmCreated = new EventEmitter<any>();
  @Output() dataSaved = new EventEmitter<any>();
  constructor(private regionService: RegionService,
     private diskService: DiskSizeService,
    public modalRef: MdbModalRef<VirtualMachineComponent>,
     private imageService: VMImageService,
   
    private localStorage: LocalStorageService, 
    private storageService: StorageService) {
    this.virtualMachineForm = new FormGroup({
      name: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      resourceGroupe: new FormControl('', Validators.required),
      idImage: new FormControl('', Validators.required),
      subnet: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      idDiskSize: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required) 
    });
    
  }
  
  ngOnInit(): void {
    this.loadRegions();
    this.loadResourceGroups();
    this.onRegionChange();
    this.loadImages();
    this.loadSubnets();

    this.currentUser = this.storageService.getUser(); // Get the logged-in user
    // Initialize the 'user' field with the ID of the logged-in user
    if (this.currentUser && this.currentUser.id) {
      this.virtualMachineForm.get('user')?.setValue(this.currentUser.id);
    }
    const storedData = this.localStorage.retrieve('virtualMachineData' + this.component.id);
    if (storedData) {
      this.virtualMachineForm.patchValue(storedData);
    } else {
      this.virtualMachineForm.reset();
    }
  }
  loadSubnets(): void {
    this.subnets = this.placedComponents.filter
    (component => component.type === 'Subnet').map(component => {
      const data = this.localStorage.retrieve('subnetData' + component.id);
      return { id: component.id, name: data.name };
  });
    console.log(this.subnets);
  }
  
  loadResourceGroups(): void {
    this.resourceGroups = this.placedComponents.filter(component => component.type === 'ressourceGroup').map(component => {
        const data = this.localStorage.retrieve('resourceGroupData' + component.id);
        return { id: component.id, name: data.name };
    });
    console.log(this.resourceGroups);
}
  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
  }
  loadImages(): void {
    this.imageService.getAllImages().subscribe(data => {
      this.images = data;
    });
  }
  onRegionChange(): void {
    const selectedRegionId = this.virtualMachineForm.value.region;
    if (selectedRegionId) {
      this.diskService.getDiskSizesByRegionId(selectedRegionId).subscribe(data => {
        this.diskSizes = data;
      });
    }
   
  }
 
  onSubmit() {
    const formData = this.virtualMachineForm.value;
    const resourceGroupData = this.localStorage.retrieve('resourceGroupData' + formData.resourceGroupe);
    formData.resourceGroupe = resourceGroupData;
    
    const subnetData = this.localStorage.retrieve('subnetData' + formData.subnet);
    formData.subnet = subnetData;
    
try {
  // Use the component's id to store its data in local storage
  this.localStorage.store('virtualMachineData' + this.component.id, formData);
  console.log(this.component.id, formData);
} catch (error) {
  console.error('Error storing data in local storage:', error);
}
this.modalRef.close();

}
  
}

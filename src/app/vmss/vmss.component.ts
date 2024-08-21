import { Component, Input, OnInit } from '@angular/core';
import { VirtualMachineService } from '../_services/virtual-machine.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VmssService } from '../_services/vmss.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { StorageService } from '../_services/storage.service';
import { FormDataService } from '../_services/form-data.service';
import { ArchitectureDataService } from '../_services/architecture-data-service.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-vmss',
  templateUrl: './vmss.component.html',
  styleUrl: './vmss.component.css'
})
export class VmssComponent implements OnInit {
  VmssForm: FormGroup;
  currentUser: any;
  virtualMachines: any[] = [];
  @Input() component: any;  
    
  @Input() placedComponents: any[] = [];  // Initialize with an empty array

  constructor(
    private storageService: StorageService,
    public modalRef: MdbModalRef<VmssComponent>,
      private localStorage: LocalStorageService  
  ) {
    this.VmssForm = new FormGroup({
      name: new FormControl('', Validators.required),
      nb_vm: new FormControl('', Validators.required),
      virtualMachine: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required) 
    });
  }

  ngOnInit(): void {
    this.loadVirtualMachine();
    this.currentUser = this.storageService.getUser(); // Get the logged-in user
    // Initialize the 'user' field with the ID of the logged-in user
    if (this.currentUser && this.currentUser.id) {
      this.VmssForm.get('user')?.setValue(this.currentUser.id);
    }
    // Use the component's id to retrieve its data from local storage
    const storedData = this.localStorage.retrieve('vmssData' + this.component.id);
    if (storedData) {
      this.VmssForm.patchValue(storedData);
    } else {
      this.VmssForm.reset();
    }
  }

  loadVirtualMachine(): void {
    this.virtualMachines = this.placedComponents.filter(component => component.type === 'Virtual machine').map(component => {
      const data = this.localStorage.retrieve('virtualMachineData' + component.id);
      return { id: component.id, name: data.name };
  });
  }
  onSubmit() {
    const formData = this.VmssForm.value;
    // Retrieve the full VirtualMachine object from local storage
    const virtualMachineData = this.localStorage.retrieve('virtualMachineData' + formData.virtualMachine);
    formData.virtualMachine = virtualMachineData;
    try {
      // Use the component's id to store its data in local storage
      this.localStorage.store('vmssData' + this.component.id, formData);
      console.log(this.component.id, formData);
    } catch (error) {
      console.error('Error storing data in local storage:', error);
    }
    this.modalRef.close();
  }
  
}
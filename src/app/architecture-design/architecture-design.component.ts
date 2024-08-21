import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { RessourceGroupComponent } from '../ressource-group/ressource-group.component';
import { SubnetComponent } from '../subnet/subnet.component';
import { VmssComponent } from '../vmss/vmss.component';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CdkDragDrop, CdkDragMove, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApplicationGatewayComponent } from '../application-gateway/application-gateway.component';
import { VirtualMachineComponent } from '../virtual-machine/virtual-machine.component';
import { VirtualNetworkComponent } from '../virtual-network/virtual-network.component';
import { FormDataService } from '../_services/form-data.service';
import { ArchitectureService } from '../_services/architecture.service';
import { StorageService } from '../_services/storage.service';
import { ArchitectureDataService } from '../_services/architecture-data-service.service';

interface Components {
  name: string;
}

@Component({
  selector: 'app-architecture-design',
  templateUrl: './architecture-design.component.html',
  styleUrl: './architecture-design.component.css',
})

export class ArchitectureDesignComponent implements OnInit {
  @ViewChild('designSpaceList') designSpaceList!: CdkDropList;

  components = [
    { name: 'Virtual machine', type: 'Virtual machine' , image: "../assets/images/vm.png"},
    { name: 'Application gateway', type: 'Application gateway', image: "../assets/images/ag.png" },
    { name: 'Virtual network', type: 'Virtual network' , image: '../assets/images/vt.png' },
    { name: 'Subnet', type: 'Subnet' , image: "../assets/images/subnet.png" },
    { name: 'RessourceGroup', type: 'ressourceGroup' , image: "../assets/images/rg.png" },
    { name: 'Vmss', type: 'Vmss' ,  image: "../assets/images/vmsss.png" },
  ];
  placedComponentsData = {
    virtualMachines: [] as any[],
    applicationGateways: [] as any[],
    virtualNetworks: [] as any[],
    subnets: [] as any[],
    resourceGroups: [] as any[],
    vmsses: [] as any[],
  };
  currentComponent: any;
  currentUser: any;
  placedComponents: any[] = [];
  saveEvent: any;
  modalRef?:MdbModalRef<any>;
  constructor(
    private dialog: MatDialog,
    private modalService: MdbModalService,
    private formDataService: FormDataService,
    private architectureService:ArchitectureService,
    private architectureDataService:ArchitectureDataService,
    private storageService:StorageService
     ) {}
    ngOnInit(): void {
    
    this.formDataService.getFormData().subscribe((data) => {
      if (data) {
            switch (this.currentComponent.name) {
          case 'Virtual machine':
            this.placedComponentsData.virtualMachines.push(data);
            break;
            case 'Virtual network':
            this.placedComponentsData.virtualNetworks.push(data);
            break;
            case 'Application gateway':
              this.placedComponentsData.applicationGateways.push(data);
              break;
              case 'RessourceGroup':
                this.placedComponentsData.resourceGroups.push(data);
              break;
              case 'Subnet':
                this.placedComponentsData.subnets.push(data);
              break;
              case 'Vmss':
                this.placedComponentsData.vmsses.push(data);
              break;
        }
      }
    });
   
  }
  openModal(component: any): void {
    this.currentComponent = component;
    console.log("Tentative d'ouverture de modal");
    let modalComponent: ComponentType<any>;
  
    // Vérifier le nom du composant et définir le composant de modal correspondant
    switch (component.name) {
      case 'Application gateway':
        modalComponent = ApplicationGatewayComponent;
        break;
      case 'Virtual machine':
        modalComponent = VirtualMachineComponent;
        break;
      case 'RessourceGroup':
        modalComponent = RessourceGroupComponent;
        break;
      case 'Subnet':
        modalComponent = SubnetComponent;
        break;
      case 'Virtual network':
        modalComponent = VirtualNetworkComponent;
        break;
      case 'Vmss':
        modalComponent = VmssComponent;
        break; 
      default:
        console.error(
          'Aucun composant de modal correspondant pour le composant :',
          component
        );
        return;
    }
  
    this.saveEvent = new EventEmitter<any>();
    this.saveEvent.subscribe((formData:any) => {
      // Stockez les données du formulaire dans le composant lorsque l'utilisateur sauvegarde le formulaire
      this.formDataService.setFormData(formData);
    });
  
    this.modalRef = this.modalService.open(modalComponent, {
      data: { componentData: component, saveEvent: this.saveEvent, formData: component.formData || null }
    });
  
    this.architectureDataService.setArchitectureData(this.placedComponentsData);
  }
  




  onDragMoved(event: CdkDragMove<any>, component: any) {
    const designSpaceRect = this.designSpaceList.element.nativeElement.getBoundingClientRect();
    let x = event.pointerPosition.x;
    let y = event.pointerPosition.y;
  
    // Vérifiez si x et y sont à l'intérieur de l'espace de conception
    if (x >= designSpaceRect.left && x <= designSpaceRect.right && y >= designSpaceRect.top && y <= designSpaceRect.bottom) {
      component.x = x;
      component.y = y;
    }
  }
    
  onDrop(event: CdkDragDrop<any[]>): void {
    const designSpaceRect = this.designSpaceList.element.nativeElement.getBoundingClientRect();
    const dropPoint = event.dropPoint;
  
    // Vérifiez si le point de dépôt est à l'intérieur de l'espace de conception
    if (dropPoint.x >= designSpaceRect.left && dropPoint.x <= designSpaceRect.right && dropPoint.y >= designSpaceRect.top && dropPoint.y <= designSpaceRect.bottom) {
      if (event.previousContainer === event.container) {
        // Déplacez l'élément dans le tableau
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
  
        // Mettez à jour la position de l'élément
        const item = event.container.data[event.currentIndex];
        item.x = dropPoint.x - designSpaceRect.left;
        item.y = dropPoint.y - designSpaceRect.top;
  
        const clonedItem = JSON.parse(JSON.stringify(item));
        clonedItem.x = dropPoint.x - designSpaceRect.left;
        clonedItem.y = dropPoint.y - designSpaceRect.top;
        event.container.data.splice(event.currentIndex, 1, clonedItem);
  
        // Force Angular à détecter les changements (si nécessaire)
        this.forceUpdate();
      } else {
        // Lors du transfert d'un conteneur à un autre
        const itemRect = event.item.element.nativeElement.getBoundingClientRect();
  
        // Calculez x et y par rapport à l'espace de conception
        let x = itemRect.left - designSpaceRect.left + event.distance.x;
        let y = itemRect.top - designSpaceRect.top + event.distance.y;
  
        let clone = JSON.parse(
          JSON.stringify(event.previousContainer.data[event.previousIndex])
        );
        clone.x = x;
        clone.y = y;
  
        this.placedComponents.splice(event.currentIndex, 0, clone);
      }
    }
    this.formDataService.setPlacedComponentsData(this.placedComponentsData);
  }
  

  
  forceUpdate() {
    // Method to trigger change detection manually if needed
    this.placedComponents = [...this.placedComponents];
  }
  getTransform(component: any): string {
    // Implement your rotation logic here (optional)
    return 'rotate(0deg)';
  }

  saveArchitecture(): void {
    let architectureData: any = {
      name: 'Nom de l\'architecture',
      dateCreation: new Date(), // La date actuelle ou une date sélectionnée par l'utilisateur
      //user:  this.storageService.getUser() 
    };
    if (this.placedComponentsData.resourceGroups.length > 0) {
      architectureData.resourceGroups = this.placedComponentsData.resourceGroups;
    }
    if (this.placedComponentsData.vmsses.length > 0) {
      architectureData.vmsses = this.placedComponentsData.vmsses;
    }
    if (this.placedComponentsData.virtualMachines.length > 0) {
      architectureData.virtualMachines = this.placedComponentsData.virtualMachines;
    }
    if (this.placedComponentsData.virtualNetworks.length > 0) {
      architectureData.virtualNetworks = this.placedComponentsData.virtualNetworks;
    }
    if (this.placedComponentsData.applicationGateways.length > 0) {
      architectureData.applicationGateways = this.placedComponentsData.applicationGateways;
    }
    if (this.placedComponentsData.subnets.length > 0) {
      architectureData.subnets = this.placedComponentsData.subnets;
    }
  
    this.architectureService.createArchitecture(architectureData)
      .subscribe({
        next: (response) => {
          console.log(architectureData);
          console.log('Architecture créée avec succès', response);
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'architecture', error);
        }
      });
  }
}



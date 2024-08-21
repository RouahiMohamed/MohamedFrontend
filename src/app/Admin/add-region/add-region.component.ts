import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../_services/region.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css'],
  
})
export class AddRegionComponent implements OnInit {
  region: any = {
    displayName: '',
    name: '',
    regionalDisplayName: ''
  };

  constructor(public modalRef: MdbModalRef<AddRegionComponent> ,private regionService: RegionService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.regionService.addRegion(this.region).subscribe({
      next: (response) => {
        console.log('Région ajoutée avec succès!', response);
        // Fermer la boîte de dialogue après un ajout réussi
        this.modalRef.close(true);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la région', error);
      }
    });
  }
}

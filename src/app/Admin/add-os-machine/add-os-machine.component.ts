import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { VMImageService } from '../../_services/images.service';

@Component({
  selector: 'app-add-os-machine',
  templateUrl: './add-os-machine.component.html',
  styleUrls: ['./add-os-machine.component.css']
})
export class AddOsMachineComponent implements OnInit {
  image: any = {
    architecture: '',
    offer: '',
    publisher: '',
    sku: '',
    urn: '',
    urnAlias: '',
    version: ''
  };

  constructor(public dialogRef: MdbModalRef<AddOsMachineComponent>, private imageService: VMImageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.imageService.saveImage(this.image).subscribe({
      next: (response) => {
        console.log('Image ajoutée avec succès!', response);
        // Fermer la boîte de dialogue après un ajout réussi
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'image', error);
      }
    });
  }
}

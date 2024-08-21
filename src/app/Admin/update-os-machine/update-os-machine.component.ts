  import { Component, Inject } from '@angular/core';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { VMImageService } from '../../_services/images.service';

  @Component({
    selector: 'app-update-os-machine',
    templateUrl: './update-os-machine.component.html',
    styleUrls: ['./update-os-machine.component.css']
  })
  export class UpdateOsMachineComponent {
    image: any;

    constructor(
      private imageService: VMImageService,
      private dialogRef: MatDialogRef<UpdateOsMachineComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.image = { ...data.image }; // Copie des données de l'image sélectionnée
    }

    updateImage(): void {
      // Appel à la méthode de mise à jour du service d'images avec l'identifiant de l'image et les données mises à jour
      this.imageService.updateImage(this.image.id, this.image).subscribe({
        next: (response) => {
          console.log('Image mise à jour avec succès!', response);
          this.dialogRef.close(true); // Ferme la boîte de dialogue avec un résultat positif
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'image', error);
          // Gérer l'erreur ou afficher un message d'erreur à l'utilisateur si nécessaire
        }
      });
    }
    closeDialog(): void {
      this.dialogRef.close();
    }
  }

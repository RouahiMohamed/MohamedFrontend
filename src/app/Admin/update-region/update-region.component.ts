import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegionService } from '../../_services/region.service';

@Component({
  selector: 'app-update-region',
  templateUrl: './update-region.component.html',
  styleUrls: ['./update-region.component.css']
})
export class UpdateRegionComponent {
  region: any;

  constructor(
    private regionService: RegionService,
    private dialogRef: MatDialogRef<UpdateRegionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.region = { ...data.region }; // Copie des données de la région sélectionnée
  }

  updateRegion(): void {
    // Appel à la méthode de mise à jour du service de régions avec l'identifiant de la région et les données mises à jour
    this.regionService.updateRegion(this.region.id, this.region).subscribe({
      next: (response) => {
        console.log('Région mise à jour avec succès!', response);
        this.dialogRef.close(true); // Ferme la boîte de dialogue avec un résultat positif
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la région', error);
        // Gérer l'erreur ou afficher un message d'erreur à l'utilisateur si nécessaire
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}

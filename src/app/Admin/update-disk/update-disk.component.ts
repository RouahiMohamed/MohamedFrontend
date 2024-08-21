import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DiskSizeService } from '../../_services/disk-size.service';
import { RegionService } from '../../_services/region.service'; // Importez le service RegionService

@Component({
  selector: 'app-update-disk',
  templateUrl: './update-disk.component.html',
  styleUrls: ['./update-disk.component.css']
})
export class UpdateDiskComponent implements OnInit {
  updatedDiskSize: any;
  regions: any[] = []; // Déclarez un tableau pour stocker les régions

  constructor(
    public dialogRef: MatDialogRef<UpdateDiskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private diskSizeService: DiskSizeService,
    private regionService: RegionService // Injectez le service RegionService
  ) {
    this.updatedDiskSize = { ...data.diskSize }; // Copiez les données de la taille du disque
  }

  ngOnInit(): void {
    this.loadRegions(); // Chargez les régions lors de l'initialisation du composant
  }

  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data; // Stockez les régions chargées dans le tableau
    });
  }

  onSubmit(): void {
    this.diskSizeService.updateDiskSize(this.updatedDiskSize.id, this.updatedDiskSize).subscribe({
      next: (response) => {
        console.log('DiskSize updated successfully!', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating DiskSize', error);
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}

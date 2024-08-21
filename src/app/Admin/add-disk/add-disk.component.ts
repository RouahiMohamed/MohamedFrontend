import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DiskSizeService } from '../../_services/disk-size.service';
import { RegionService } from '../../_services/region.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-disk',
  templateUrl: './add-disk.component.html',
  styleUrl: './add-disk.component.css'
  
})
export class AddDiskComponent implements OnInit {
  diskSize: any = {
    maxDataDiskCount: 0,
    idRegion: '',
    memoryInMB: 0,
    name: '',
    numberOfCores: 0,
    osDiskSizeInMB: 0,
    resourceDiskSizeInMB: 0
  };
  regions: any[] = [];
  constructor(public modalRef: MdbModalRef<AddDiskComponent> ,private regionService: RegionService, private diskSizeService: DiskSizeService) { }

  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
  }

  onSubmit(): void {
    this.diskSizeService.saveDiskSize(this.diskSize).subscribe({
      next: (response) => {
        console.log('DiskSize ajouté avec succès!', response);
        // Fermer la boîte de dialogue après un ajout réussi
        this.modalRef.close(true);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du DiskSize', error);
      }
    });
  }
}
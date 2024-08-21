import { Component, OnInit, ViewChild } from '@angular/core';
import { AddDiskComponent } from '../add-disk/add-disk.component';
import { UpdateDiskComponent } from '../update-disk/update-disk.component';
import { DiskSizeService } from '../../_services/disk-size.service';
import { MatPaginator } from '@angular/material/paginator';
import { RegionService } from '../../_services/region.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.css']
})
export class DiskComponent implements OnInit {
  diskSizes: any[] = [];
  pagedDiskSizes: any[] = [];
  regionFilter: string = ''; // Filtre d'entrée
  pageSize: number = 10; // Éléments par page
  pageIndex: number = 0; // Index de page actuel
  dataToUpdate: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  modalRef: MdbModalRef<AddDiskComponent> | null = null;
  modalRefUpdate: MdbModalRef<UpdateDiskComponent> | null = null;
  constructor(private dialog: MatDialog, private diskSizeService: DiskSizeService, private modalService: MdbModalService, private regionService: RegionService) { }

  ngOnInit(): void {
    this.fetchDiskSizes();
  }
  openModal() {
    console.log('Tentative d\'ouverture de modal');
    this.modalRef = this.modalService.open(AddDiskComponent);
    this.modalRef.onClose.subscribe(() => {
      this.fetchDiskSizes(); // Appeler fetchDiskSizes() lorsque le modal se ferme
    });
  }
  
  openUpdateDiskSizeDialog(diskSize: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { diskSize };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50vw'; // Largeur du dialogue
    dialogConfig.maxWidth = '100vw'; // Largeur maximale
    dialogConfig.position = { top: '-125%', left: '25%' };
    dialogConfig.position = { top: '-125vh', left: '25vw' };
     
     const dialogRef = this.dialog.open(UpdateDiskComponent, dialogConfig);

     dialogRef.afterClosed().subscribe(result => {
       console.log('La boîte de dialogue a été fermée');
       if (result) {
         // Si la boîte de dialogue a été fermée avec un résultat, actualiser la liste des tailles de disque
         this.fetchDiskSizes();
       }
     });
  }
  
  
  fetchDiskSizes(): void {
    this.diskSizeService.getAllDiskSizes().subscribe({
      next: (data) => {
        this.diskSizes = data;
        this.applyFilter(); // Appliquer le filtre initial
        console.log(data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des tailles de disque', error);
      }
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.applyFilter(); // Réappliquer le filtre lorsque la page change
  }

  applyFilter(): void {
    // Filtrer les tailles de disque par région
    this.pagedDiskSizes = this.diskSizes
      .filter(diskSize => diskSize.name.toLowerCase().includes(this.regionFilter.toLowerCase()))
      .slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);

    // Récupérer le nom de la région pour chaque taille de disque
    this.pagedDiskSizes.forEach(diskSize => {
      this.regionService.getRegionById(diskSize.idRegion).subscribe({
        next: (region) => {
          diskSize.regionName = region.displayName; // Stocker le nom de la région dans l'objet diskSize
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du nom de région', error);
        }
      });
    });
  }


  deleteDiskSize(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette taille de disque ?')) {
      this.diskSizeService.deleteDiskSizeById(id).subscribe({
        next: () => {
          console.log('Taille de disque supprimée avec succès !');
          this.fetchDiskSizes(); // Rafraîchir la liste des tailles de disque après la suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la taille de disque', error);
        }
      });
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { VMImageService } from '../../_services/images.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddOsMachineComponent } from '../add-os-machine/add-os-machine.component';
import { UpdateOsMachineComponent } from '../update-os-machine/update-os-machine.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-os-machine',
  templateUrl: './os-machine.component.html',
  styleUrls: ['./os-machine.component.css']
})
export class OsMachineComponent implements OnInit {
  images: any[] = [];
  pagedImages: any[] = [];
  offerFilter: string = ''; // Filter input
  pageSize: number = 10; // Items per page
  pageIndex: number = 0; // Current page index
  modalRef: MdbModalRef<AddOsMachineComponent> | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table: any;

  constructor(private modalService: MdbModalService,private imageService: VMImageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.imageService.getAllImages().subscribe({
      next: (data) => {
        this.images = data;
        this.applyFilter(); // Apply initial filter
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching images', error);
      }
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.applyFilter(); // Re-apply filter when page changes
  }

  applyFilter(): void {
    // Filter images by offer
    this.pagedImages = this.images
      .filter(image => image.offer.toLowerCase().includes(this.offerFilter.toLowerCase()))
      .slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }
  openAddImageDialog(): void {
    this.modalRef = this.modalService.open(AddOsMachineComponent); 
    this.modalRef.onClose.subscribe(() => {
       this.fetchImages();
     });
  }
  deleteImage(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      this.imageService.deleteImageById(id).subscribe({
        next: () => {
          console.log('Image supprimée avec succès!');
          this.fetchImages(); // Rafraîchir la liste des images après la suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'image', error);
        }
      });
    }
  }

  openUpdateImageDialog(image: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { image };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50vw'; // Largeur du dialogue
    dialogConfig.maxWidth = '100vw'; // Largeur maximale
    dialogConfig.position = { top: '-125%', left: '25%' };
    dialogConfig.position = { top: '-125vh', left: '25vw' };
    
     const dialogRef = this.dialog.open(UpdateOsMachineComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        // Si la boîte de dialogue a été fermée avec un résultat, actualisez la liste des images
        this.fetchImages();
      }
    });
  }
  
}

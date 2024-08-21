import { Component, OnInit } from '@angular/core';
import { ArchitectureService } from '../_services/architecture.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TerraformCodeDialogComponent } from '../terraform-code-dialog/terraform-code-dialog.component';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.css'
})
export class MyListComponent implements OnInit {
  architectures: any[] = [];

  constructor(private architectureService: ArchitectureService, private storageService: StorageService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUserArchitectures();
  }

  loadUserArchitectures(): void {
    const user = this.storageService.getUser();
    if (user && user.id) {
      this.architectureService.getUserArchitectures(user.id).subscribe(data => {
        this.architectures = data;
      });
    }
  }


  viewDetails(architecture: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { architecture };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50vw'; // Largeur du dialogue
    dialogConfig.maxWidth = '100vw'; // Largeur maximale
    dialogConfig.position = { top: '-50%', left: '25%' };
    dialogConfig.position = { top: '-50vh', left: '25vw' };
  
    dialogConfig.panelClass = 'custom-dialog-container'; 
  
    this.dialog.open(TerraformCodeDialogComponent, dialogConfig);
  }
  
}


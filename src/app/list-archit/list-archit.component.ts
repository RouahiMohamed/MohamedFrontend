import { Component, OnInit } from '@angular/core';
import { ArchitectureService } from '../_services/architecture.service';
import { TerraformCodeDialogComponent } from '../terraform-code-dialog/terraform-code-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-list-archit',
  templateUrl: './list-archit.component.html',
  styleUrl: './list-archit.component.css'
})
export class ListArchitComponent implements OnInit {
  architectures: any[] = [];

  constructor(private architectureService: ArchitectureService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadArchitectures();
  }

  loadArchitectures(): void {
    this.architectureService.getAllArchitectures().subscribe(data => {
      this.architectures = data;
    });
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

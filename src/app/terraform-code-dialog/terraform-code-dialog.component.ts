import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terraform-code-dialog',
  templateUrl: './terraform-code-dialog.component.html',
  styleUrls: ['./terraform-code-dialog.component.css']
})
export class TerraformCodeDialogComponent  {
  architecture: any;
  selectedCodeType: string = 'pulumi';

  constructor(public dialogRef: MatDialogRef<TerraformCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.architecture = data.architecture;
  }
  onCodeTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCodeType = selectElement.value;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

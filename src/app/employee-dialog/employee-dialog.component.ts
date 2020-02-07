import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Define data object to overcome undefined error
    public dialogRef: MatDialogRef<EmployeeDialogComponent> ) {

   }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}

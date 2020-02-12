import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { EmployeeService } from '@app/_services';
import { Employee } from '@app/_models';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

	employeeForm: FormGroup;
	public mode = "";
	public modeFlag: boolean = false;
	constructor(
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any, // Define data object to overcome undefined error
		public dialogRef: MatDialogRef<EmployeeDialogComponent>,
		private employeeService: EmployeeService) {
   }

  ngOnInit() {  
	  if(this.mode === "view") {
		this.modeFlag = true;
	  }
	  
	  this.employeeForm = this.formBuilder.group({ 
			id: [{ value: '', disabled: this.modeFlag }],
			firstName: [{ value: '', disabled: this.modeFlag }, [Validators.required]],
            lastName: [{ value: '', disabled: this.modeFlag }, [Validators.required]],
			company: [{ value: '', disabled: this.modeFlag }],
			jobTitle: [{ value: '', disabled: this.modeFlag }],
			street: [{ value: '', disabled: this.modeFlag }],
			city: [{ value: '', disabled: this.modeFlag }],
			state: [{ value: '', disabled: this.modeFlag }],
			country: [{ value: '', disabled: this.modeFlag }],
			email: [{ value: '', disabled: this.modeFlag }]			
        });
  }

  closeDialog(){	
    this.dialogRef.close({event:'Close'});
  }
  
  update(employee) {
	this.employeeService.update(employee).pipe().subscribe(employee => {
		this.dialogRef.close({event:'Update'});
		return employee;						
		}, err => {
			console.log('err',err);
			//this.error = err;
		});
  }
}

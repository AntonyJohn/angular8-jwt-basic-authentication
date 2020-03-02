import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { EmployeeService } from '@app/modules/employee/services';
import { Employee } from '@app/modules/employee/models';

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
			firstName: [{ value: '', disabled: this.modeFlag }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            lastName: [{ value: '', disabled: this.modeFlag }, [Validators.required]],
			company: [{ value: '', disabled: this.modeFlag }],
			jobTitle: [{ value: '', disabled: this.modeFlag }],
			mobilePhone: [{ value: '', disabled: this.modeFlag }],
			street: [{ value: '', disabled: this.modeFlag }],
			city: [{ value: '', disabled: this.modeFlag }],
			state: [{ value: '', disabled: this.modeFlag }],
			country: [{ value: '', disabled: this.modeFlag }],
			email: [{ value: '', disabled: this.modeFlag }, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]			
        });
  }

  closeDialog(){	
    this.dialogRef.close({event:'Close'});
  }
  
  update(employee) {
	// stop here if form is invalid
	if (this.employeeForm.invalid) {
		return;
	}
	this.employeeService.update(employee).pipe().subscribe(employee => {	
			this.dialogRef.close({event:'Update',data:employee});		
		}, err => {
			console.log('err',err);
			//this.error = err;
		});
  }
  
  add(employee) {  
	// stop here if form is invalid
	if (this.employeeForm.invalid) {
		return;
	}
	employee.status = "Active";
	this.employeeService.add(employee).pipe().subscribe(employee => {			
			this.dialogRef.close({event:'Add',data:employee});
		}, err => {
			console.log('err',err);
			//this.error = err;
		});
  }
}

import { Component, OnInit, Inject, Pipe, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { EmployeeService } from '@app/modules/employee/services';
import { Employee } from '@app/modules/employee/models';

import { first } from 'rxjs/operators';
//import * as moment from 'moment';

export const MY_FORMATS = {
	parse: {
		dateInput: 'DD-MM-YYYY'
	},
	display: {
		dateInput: 'DD-MM-YYYY',
		monthYearLabel: 'DD-MM-YYYY',
		dateA11yLabel: 'LL',
		monthYearA11Label: 'DD-MM-YYYY'
	}
};

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css'],
  providers: [
	  /*
		`MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your 
		application's root module.
	  */
	  {
		  provide: DateAdapter,
		  useClass: MomentDateAdapter,
		  deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
	  },
	  {
		  provide: MAT_DATE_FORMATS,
		  useValue: MY_FORMATS
	  }
  ]
})
export class EmployeeDialogComponent implements OnInit {

	employeeForm: FormGroup;
	public mode = "";
	public modeFlag: boolean = false;
	minDate: Date;
	maxDate: Date;
	//@ViewChild('datemask', {static: false}) input;

	constructor(
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any, // Define data object to overcome undefined error
		public dialogRef: MatDialogRef<EmployeeDialogComponent>,
		private employeeService: EmployeeService) {
			let now: Date = new Date();
			this.minDate = new Date(now.getFullYear() - 69, now.getMonth(), now.getDate());
			this.maxDate = new Date(now.getFullYear() - 19, now.getMonth(), now.getDate());
			
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
			dob: [{ value: '', disabled: this.modeFlag }],
			mobilePhone: [{ value: '', disabled: this.modeFlag }],
			street: [{ value: '', disabled: this.modeFlag }],
			city: [{ value: '', disabled: this.modeFlag }],
			state: [{ value: '', disabled: this.modeFlag }],
			country: [{ value: '', disabled: this.modeFlag }],
			email: [{ value: '', disabled: this.modeFlag }, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]			
		});
		//console.log("TTTTT::",this.data.dob,moment(this.data.dob,"YYYY-MM-DD h:m:s").format("DD-MM-YYYY"))
		//this.employeeForm.get('dob').setValue(moment(this.data.dob,"YYYY-MM-DD h:m:s").format("DD-MM-YYYY"));
		//this.data.dob = moment(this.data.dob,"YYYY-MM-DD h:m:s").format("DD-MM-YYYY");
		//this.input.nativeElement.value = moment(this.data.dob,"YYYY-MM-DD h:m:s").format("DD-MM-YYYY");
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

  /*public onChange(event: any): void {
	  console.log("onchange")
	  console.log("yyyy:",moment(this.employeeForm.get('dob').value,"YYYY-MM-DD h:m:s").format("DD-MM-YYYY"))
	this.input.nativeElement.value = moment(this.employeeForm.get('dob').value,"YYYY-MM-DD h:m:s").format("DD-MM-YYYY");
  }*/
}

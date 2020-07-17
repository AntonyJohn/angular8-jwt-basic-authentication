import { Component, ViewChild, OnInit  } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';

import { AuthenticationService } from '@app/_services';
import { EmployeeService } from '@app/modules/employee/services';
import { Employee } from '@app/modules/employee/models';

import { EmployeeDialogComponent } from '@app/modules/employee/employee-dialog/employee-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';


import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';

import { ConfirmDialogModel, ConfirmDialogComponent } from '../../modules/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
	
	// datasource array
	employeesAll = [];	// Overall employee details array
	employees = [];		// employee details array for per page
	
	// Pagination properties
	pageSizeOptions = [2, 4, 50];  	// Define page size options
	pageIndex: number = 0; 			// Actual Page Index for current page
	pageSize: number = 0; 			// Total number of records per page
	length: number = 0; 			// Total length of the table
	
	// Pagination properties while page navigation
	navPageSize:number = 0;			// Total number of records per page in page navigation	
	navPageStartIndex:number = 0;	// Set the employeesAll[] start index when page navigation
	navPageIndex:number = 0;		// Set the page index value when Page Navigation
			
	isLoading=false;	
	error = '';	
	
	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	dataSource = new MatTableDataSource();	
	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'company', 'edit'];
	
	constructor(public authenticationService: AuthenticationService,
				private employeeService: EmployeeService,
				public dialog: MatDialog,
				private router: Router,
				private spinnerService: NgxSpinnerService,
				private toastr: ToastrManager) { }
  
	ngOnInit() {	
		console.log("oninit")
		this.spinnerService.show();
		this.loadAllEmployees((data_) => {
			if(data_){
				this.employeesAll = data_;
				this.pageSize = this.pageSizeOptions[0];
				console.log('this.pageSize',this.pageSize,'----',this.employeesAll.length)
				for(let i=0; i<this.employeesAll.length; i++){
					if(i < this.pageSize) {
						this.employees[i] = this.employeesAll[i];
					}
				}
				setTimeout(() => {			  				
					this.dataSource.data = this.employees;
					console.log(this.dataSource);
					this.dataSource.paginator = this.paginator;
					this.length=this.employeesAll.length;
					this.isLoading = true;
				});
			}
		});	  
	}
  
    // To get all the employees details
	public loadAllEmployees(callback) {		
		this.employeeService.getAll().pipe(first()).subscribe(employees => {
			if(employees){
				this.spinnerService.hide();
				callback(employees);
			}
		}, err => {
			console.log('err',err);
			this.error = err;
		});
	}		
	
	// Invoke this method when mat-table page event
	changePage(event){
		let j = 0;
		
		// To flush the employees array
		this.employees.length = 0;
		
		// Define navPageIndex when navigating to next/ previous page
		this.pageIndex = event.pageIndex;
		this.navPageIndex = this.pageIndex + 1;
		console.log("navPageIndex:"+this.navPageIndex)
		
		// Define navPageSize when navigating to next/ previous page
		this.navPageSize = event.pageSize * (event.pageIndex + 1); // API starts 1, Mat-Table starts at 0
		console.log("navPageSize:"+this.navPageSize)
		
		// Define navPageStartIndex for employees[] when navigating to next/ previous page
		this.navPageStartIndex = this.navPageSize - event.pageSize;
		console.log("navPageStartIndex:"+this.navPageStartIndex)
		
		// Define navPageSize when navigating to last page to avoid blank row insert in mat-table
		if(this.navPageSize > this.employeesAll.length) {
			this.navPageSize = this.employeesAll.length;
		}
		
		// Add employee details from employeeAll[] into employees[] Array based on page navigation condition
		for(let i=this.navPageStartIndex; i<this.navPageSize; i++){
			this.employees[j++] = this.employeesAll[i];			
		}
		this.dataSource.data = this.employees;		
	}
	
	// Invoke this method to view the particular employee details
	openPopup(selectedRow, mode){
		if(mode === 'add') {
			selectedRow = new Employee();
		}
		let dialogRef = this.dialog.open(EmployeeDialogComponent, {
		  width: '850px', 
		  height: '850px',
		  data: selectedRow
		});
		let instance = dialogRef.componentInstance;  // Get the employee-dialog-component.ts instance to assign the value for 'mode' variable
		
		instance.mode = mode;
		console.log('instance:'+instance.mode)
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.toastr.successToastr("", instance.mode == "add" ? "Employee added sucessfully" : "Employee updated sucessfully", { position: "bottom-full-width" });
			this.isLoading=false;
			this.loadAllEmployees((data_) => {
				if(data_){
					this.employeesAll = data_;
					for(let i=0; i<this.employeesAll.length; i++){
						if(i < this.pageSize) {
							this.employees[i] = this.employeesAll[i];
						}
					}
					setTimeout(() => {			  				
						this.dataSource.data = this.employees;
						this.length=this.employeesAll.length;				
						this.isLoading = true;						
					});
				}
			});	
		});
		
	}

	delete(employee) {
		let message = "Are you sure to delete "+employee.firstName
		const dialogData = new ConfirmDialogModel("Confirm Action", message);    
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
		  width: '40%', 
		  disableClose: true,
		  data: dialogData
		});
		
		dialogRef.afterClosed().subscribe(result => {
		  console.log(result)
		  if (result) {
			let j = 0;		
			this.employeeService.delete(employee.id).pipe().subscribe(res => {
			
			// To flush the employees array while delete
			this.employees.length = 0;
			this.toastr.successToastr("", "Employee deleted sucessfully", { position: "bottom-full-width" });

			// Remove the record from employeesAll[]
			for(let i=0; i<this.employeesAll.length; i++){			
				if (this.employeesAll[i].id === employee.id) {
					this.employeesAll.splice(i,1);
				}
			}
			console.log("navPageIndex:"+this.navPageIndex)
			// Define navPageSize when delete the row from table
			this.navPageSize = this.pageSize * this.navPageIndex;
			console.log("navPageSize:"+this.navPageSize)
			
			// Define navPageStartIndex for employees[] when delete the row from table
			this.navPageStartIndex = this.navPageSize - this.pageSize;
			console.log("navPageStartIndex:"+this.navPageStartIndex)
			
            // Define navPageSize when navigating to last page to avoid blank row insert in mat-table
			if(this.navPageSize > this.employeesAll.length) {
				this.navPageSize = this.employeesAll.length;
			}
						
			// Add employee details from employeeAll[] into employees[] Array based on page navigation condition
			for(let ii=this.navPageStartIndex; ii<this.navPageSize; ii++){
				this.employees[j++] = this.employeesAll[ii];			
			}
			this.length=this.employeesAll.length;
			if(this.employees.length === 0 && this.length != 0) {			
				this.paginator.pageIndex = (this.pageIndex - 1), // number of the page you want to jump.
					this.paginator.page.next({      
					  pageIndex: (this.pageIndex - 1),
					  pageSize: this.pageSize,
					  length: this.length
					});
			}
			this.dataSource.data = this.employees.length == 0 ? this.employeesAll : this.employees;		        					
		}, err => {
			console.log('err',err);
			//this.error = err;
		});
		console.log("Implement delete functionality here");
		  }
		});
		
  }
}


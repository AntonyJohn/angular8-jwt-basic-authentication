import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';

import { AuthenticationService, EmployeeService } from '@app/_services';
import { Employee } from '@app/_models';

import { EmployeeDialogComponent } from '@app/employee-dialog/employee-dialog.component';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
	
	// datasource array
	employeesAll = [];	
	employees = [];		
	
	// Pagination properties
	pageSizeOptions = [4, 8, 50];
	navPageSize:number = 0;	
	pageSize: number = 0;
	length: number = 0;	
	isLoading=false;
	
	error = '';	
	
	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	dataSource = new MatTableDataSource();	
	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'company'];
	
	constructor(private authenticationService: AuthenticationService,
				private employeeService: EmployeeService,
				public dialog: MatDialog) { }
  
	ngOnInit() {	
		this.loadAllEmployees((data_) => {
			if(data_){
				this.employeesAll = data_;
				this.pageSize = this.pageSizeOptions[0];
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
		
		// Define navPageSize when navigating to next page
		this.navPageSize = event.pageSize * (event.pageIndex + 1); // API starts 1, Mat-Table starts at 0
				
		let navPageStartIndex = this.navPageSize - event.pageSize;
		
		// Define navPageSize when navigating to last page to avoid blank row insert in mat-table
		if(this.navPageSize > this.employeesAll.length) {
			this.navPageSize = this.employeesAll.length;
		}
		
		for(let i=navPageStartIndex; i<this.navPageSize; i++){
			this.employees[j++] = this.employeesAll[i];			
		}
		this.dataSource.data = this.employees;		
	}
	
	// Invoke this method to view the particular employee details
	openPopup(selectedRow){
		let dialogRef = this.dialog.open(EmployeeDialogComponent, {
		  width: '600px', 
		  height: '400px',
		  data: selectedRow
		});
		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		});
		
	}	
}


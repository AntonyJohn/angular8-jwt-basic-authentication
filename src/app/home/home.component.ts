import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { Employee } from '@app/modules/employee/models';
import { AuthenticationService } from '@app/_services';
import { EmployeeService } from '@app/modules/employee/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  	employees = [];
	constructor(public authenticationService: AuthenticationService,
	private employeeService: EmployeeService,
	private spinnerService: NgxSpinnerService) { }

	ngOnInit() {
		this.spinnerService.show();
		this.loadAllEmployees();
	}

	private loadAllEmployees() {
		this.employeeService.getAll()
			.pipe(first())
			.subscribe(employees => {		
			setTimeout(() => {  
				this.employees = employees
				this.spinnerService.hide();
			}, 1000);
		});						
	}
}

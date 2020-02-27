import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { Employee } from '@app/_models';
import { EmployeeService, AuthenticationService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  	employees = [];
	constructor(private authenticationService: AuthenticationService,
	private employeeService: EmployeeService,
	private spinner: NgxSpinnerService) { }

	ngOnInit() {
		this.spinner.show();
		this.loadAllEmployees();
	}

	private loadAllEmployees() {
		this.employeeService.getAll()
			.pipe(first())
			.subscribe(employees => {		
			setTimeout(() => {  
				this.employees = employees
				this.spinner.hide();
			}, 1000);
		});						
	}
}

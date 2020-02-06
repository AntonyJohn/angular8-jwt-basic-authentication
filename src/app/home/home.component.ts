import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { Employee } from '@app/_models';
import { EmployeeService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  	employees = [];
	constructor(private authenticationService: AuthenticationService,
	private employeeService: EmployeeService) { }

	ngOnInit() {
		this.loadAllEmployees();
	}

	private loadAllEmployees() {
		this.employeeService.getAll()
			.pipe(first())
			.subscribe(employees => this.employees = employees);
			
	}
}

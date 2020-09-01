import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { Employee } from '@app/modules/employee/models';
import { AuthenticationService } from '@app/_services';
import { EmployeeService } from '@app/modules/employee/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@app/_services/translate.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  	employees = [];
	constructor(public authenticationService: AuthenticationService,
	private employeeService: EmployeeService,
	private spinnerService: NgxSpinnerService,
	public translate: TranslateService,
	public global: GlobalService) { }

	ngOnInit() {
		this.spinnerService.show();
		this.loadAllEmployees();
	}

	private loadAllEmployees() {
		console.log("loadAllEmployees")
		this.employeeService.getAll()
			.pipe(first())
			.subscribe(employees => {		
			setTimeout(() => {  
				this.employees = employees.responseValue;
				console.log("this.employees>>>>",this.employees)
				this.spinnerService.hide();
			}, 1000);
		});						
	}
}



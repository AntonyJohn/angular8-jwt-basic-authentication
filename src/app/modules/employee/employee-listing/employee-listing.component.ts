import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@app/_services';
import { EmployeeService } from '@app/modules/employee/services';
import { NgxSpinnerService } from "ngx-spinner";

import { LocalDataSource } from '@app/modules/ng2-smart-table/lib/data-source/local/local.data-source'
import { animations } from 'ack-angular-fx';

@Component({
  animations: animations,
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.css']
})
export class EmployeeListingComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,
    private employeeService: EmployeeService,
    private spinnerService: NgxSpinnerService) { }

  employeesAll = [];
  error = '';
  source: LocalDataSource;

  settings = {
    mode: 'external', // inline|external|
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'active'
        },
        {
          name: 'edit',
          title: '<img src="assets/images/edit1.png">',
          icon: {
            name:'deactive', className:'user-list icon-edit'
          } 
        },
        {
          name: 'delete',
          title: '<img src="assets/images/delete.png">',
          icon: {
            name:'deactive', className:'user-list icon-delete'
          } 
        }
      ],
      position: 'right', // left|right
    },
    pager: {
      display: true,
      perPage: 5,
    },
    columns: {

      firstName: {
        title: 'First Name',
        filter: true,  
      },
      lastName: {
        title: 'Last Name',
        filter: true,
      },
      email: {
        title: 'Email',
        filter: true,
      },
      mobilePhone: {
        title: 'Mobile No',
        filter: true,
      },
      dob: {
        title: 'DOB',
        filter: true,
      },
      /*jobTitle: {
        title: 'Job Title',
        filter: true,
      },*/
      company: {
        title: 'Company',
        filter: true,
      }
      
    }
  };

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'FirstName',
        search: query
      },
      {
        field: 'LastName',
        search: query
      },
      {
        field: 'Email',
        search: query
      },
      {
        field: 'Mobile Number',
        search: query
      },
      {
        field: 'DOB',
        search: query
      },
      /*{
        field: 'Job Title',
        search: query
      },*/
      {
        field: 'Company',
        search: query
      }

    ], false);
  }

  ngOnInit() {
    console.log("oninit")
		this.spinnerService.show();
		this.loadAllEmployees((data_) => {
			if(data_){
				this.employeesAll = data_;
				
				setTimeout(() => {	          				
					this.source = data_;
				});
			}
		});	  
  }

  // To get all the employees details
	public loadAllEmployees(callback) {		
		this.employeeService.getAll().subscribe(employees => {
      this.spinnerService.hide();		  
			if(employees){
				callback(employees);
			}
		}, err => {
			console.log('err',err);
			this.error = err;
		});
	}
}

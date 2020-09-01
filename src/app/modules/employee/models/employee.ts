import { Address } from './Address';

export class Employee {
	id:string;
	firstName:string;
	lastName:string;
	company:string;
	jobTitle:string;
	dob:string;
	mobilePhone:string;	
	email:string;
	url:string;   
	status:string;
	address: Address[];

	constructor(){
       this.id = "";
       this.firstName = "";
	   this.lastName = "";
       this.company = "";
	   this.jobTitle = "";
	   this.dob = "";
       this.mobilePhone = "";	   
	   this.email = "";
       this.url = "";
	   this.status = "";
	   this.address=[];
   }
}
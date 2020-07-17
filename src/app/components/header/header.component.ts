import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { EmployeeService } from '@app/modules/employee/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@app/_services/translate.service';
import { GlobalService } from '@app/global.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	isLoggedIn$: any;

  constructor(public authenticationService: AuthenticationService,
    private employeeService: EmployeeService,
    private spinnerService: NgxSpinnerService,
    public translate: TranslateService,
    public global: GlobalService) { }

  ngOnInit() {
	  console.log("header oninit")
	//this.isLoggedIn$ = this.authenticationService.isLoggedIn;
	this.authenticationService.logg.subscribe(data => this.isLoggedIn$ = data);
	console.log("this.isLoggedIn$::",this.isLoggedIn$)
    this.onLangChange(0);
  }

  onLangChange(evt: any) {
		console.log("event:",evt)
		if (this.global.lang[evt ? 1 : 0].value == "ar") {
		  this.global.pageDir = "rtl"
		} else {
		  this.global.pageDir = "ltr"
		}
		this.global.selectLang = this.global.lang[evt ? 1 : 0].value;
		console.log("this.global.selectLang",this.global.selectLang)
		this.global.formLanguage.emit(this.global.selectLang)
		this.translate.use(this.global.selectLang).then((data) => {
		  this.global.loadPageContent(window.location.hash);
		  this.global.menuContent = this.translate.data["menu"];
		  console.log("this.global.menuContent",this.global.menuContent)
		  //this.global.commonContent = this.translate.data["commonmessage"]
		});
		if (this.global.landId == 0) {
		  this.global.landId = 1;
		} else if (this.global.landId == 1) {
		  this.global.landId = 0;
		}
    }
    
}

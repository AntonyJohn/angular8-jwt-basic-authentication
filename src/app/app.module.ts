import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, BasicAuthInterceptor, ErrorInterceptor } from './_helpers';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AngularMaterialsModule } from './modules/angular-materials/angular-materials.module';
import { EmployeeModule } from './modules/employee/employee.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  HttpClientModule,
	  ReactiveFormsModule,    
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AngularMaterialsModule,
    EmployeeModule
  ],
  providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    //fakeBackendProvider
	],
	entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

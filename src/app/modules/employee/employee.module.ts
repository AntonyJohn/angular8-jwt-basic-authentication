import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { EmployeeRoutingModule } from '../employee/employee-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgxSpinnerModule } from 'ngx-spinner';

import { EmployeeComponent } from './employee.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { Ng2SmartTableModule } from '../ng2-smart-table';

@NgModule({
  declarations: [EmployeeComponent,EmployeeDialogComponent, EmployeeListingComponent],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    EmployeeRoutingModule,    
    ReactiveFormsModule,
    NgxSpinnerModule,
    Ng2SmartTableModule
  ],
  entryComponents: [EmployeeDialogComponent]
})
export class EmployeeModule { }

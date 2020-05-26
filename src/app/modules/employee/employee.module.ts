import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { EmployeeRoutingModule } from '../employee/employee-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgxSpinnerModule } from 'ngx-spinner';

import { EmployeeComponent } from './employee.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';

@NgModule({
  declarations: [EmployeeComponent,EmployeeDialogComponent],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    EmployeeRoutingModule,    
    ReactiveFormsModule,
    NgxSpinnerModule 
  ],
  entryComponents: [EmployeeDialogComponent]
})
export class EmployeeModule { }

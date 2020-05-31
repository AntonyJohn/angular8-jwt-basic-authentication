import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeListingComponent } from '../employee/employee-listing/employee-listing.component';

const routes: Routes = [
    { path: '', component: EmployeeComponent },
    { path: 'listing', component: EmployeeListingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent,  canActivate: [AuthGuard] },	
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


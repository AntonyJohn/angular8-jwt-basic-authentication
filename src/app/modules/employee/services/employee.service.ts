import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Employee } from '@app/modules/employee/models';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
employee: [];
    constructor(private http: HttpClient) { }

    getAll() : Observable<any> {
		return this.http.get<any>(`${environment.apiUrl}/employee-management/employees`);
    }
	
	add(employee: Employee) : Observable<any> {
		return this.http.post<Employee>(`${environment.apiUrl}/employee-management/employee`,employee);
    }
	
	update(employee: Employee) : Observable<any> {
		return this.http.put<Employee>(`${environment.apiUrl}/employee-management/employee/`,employee);
    }
	
	delete(empId: string) : Observable<any> {
		return this.http.delete<Employee>(`${environment.apiUrl}/employee-management/employee/`+empId);
    }
}
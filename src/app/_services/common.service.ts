import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Employee } from '@app/_models';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
employee: [];
    constructor(private http: HttpClient) { }

    getAll() : Observable<Employee[]> {
		return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
    }
	
	update(employee: Employee) : Observable<Employee> {
		return this.http.put<Employee>(`${environment.apiUrl}/employees/`+employee.id,employee);
    }
	
	delete(empId) : Observable<Employee> {
		return this.http.delete<Employee>(`${environment.apiUrl}/employees/`+empId);
    }
	
	add(employee: Employee) : Observable<Employee> {
		return this.http.post<Employee>(`${environment.apiUrl}/employees/`,employee);
    }
}
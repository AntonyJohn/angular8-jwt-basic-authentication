import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Employee } from '@app/_models';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getAll() : Observable<Employee[]> {
		return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
    }
}
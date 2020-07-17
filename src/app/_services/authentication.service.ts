﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private loggedIn: BehaviorSubject<boolean>;
    public logg: Observable<Boolean>;

    get isLoggedIn(): Boolean { 
        return this.loggedIn.value;
    }
    
    constructor(private http: HttpClient, private router: Router) {
        console.log("Authentication service constructor")
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.loggedIn= new BehaviorSubject<boolean>(this.currentUserValue == null || this.currentUserValue[0] == undefined ? false : true);
        this.logg=this.loggedIn.asObservable();
    }

    public get currentUserValue(): User {
		return this.currentUserSubject.value;
    }

    loginJWT(username: string, password: string) {
		console.log('login');
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

	login(username: string, password: string) {		
        return this.http.post<any>(`${environment.apiUrl}/login/authenticate`, { username , password })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);				
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.loggedIn.next(this.currentUserValue[0] == undefined ? false : true);
                return user;
            }));
    }
	
    logout() {
		console.log('logout');
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.loggedIn.next(false);
		this.router.navigate(["/login"]);
    }
}
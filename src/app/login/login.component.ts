import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
	error = '';
	
  constructor( 
		private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {
		
		// redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
	}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
		console.log("returnUrl:"+this.returnUrl);
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
	console.log("onSubmit")
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        /*this.authenticationService.loginBasic(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
					if(data.length === 0) {
						this.error = 'Invalid Credentials';						
						this.loading = false;
						this.authenticationService.currentUserValue.authdata = "";
						this.router.navigate(['/login']);						
					} else {
						console.log('sucess:'+data.length);
						this.router.navigate([this.returnUrl]);
					}
                },
                error => {
                    this.error = error;
					this.loading = false;
					this.router.navigate(['/login']);
                });*/

                this.authenticationService.loginJWT(this.f.username.value, this.f.password.value)
                    .pipe(first())
                    .subscribe(
                        data => {
                            if(data.length === 0) {
                                console.log("Invalid Credentials")
                                this.error = 'Invalid Credentials';						
                                this.loading = false;
                                this.authenticationService.currentUserValue.token= "";
                                this.authenticationService.currentUserValue.authdata = "";
                                this.router.navigate(['/login']);						
                            } else {
                                console.log('sucess:'+data.length);
                                this.router.navigate([this.returnUrl]);
                            }
                        },
                        error => {
                            this.error = error;
                            this.loading = false;
                            this.router.navigate(['/login']);
                    });
    }

}

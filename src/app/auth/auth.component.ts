import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    @ViewChild('authForm', { static: false }) authForm: NgForm;
    constructor(private authServ: AuthService, private router: Router) { }
    error = null;
    isLoading = false;
    ngOnInit(): void { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        this.isLoading = true;
        const { password, email } = this.authForm.value;
        let authObs: Observable<AuthResponseData>;
        if (!this.authForm.valid) {
            return;
        }
        if (this.isLoginMode) {
            // Login
            authObs = this.authServ.login(email, password);

        } else {
            // SignUp
            authObs = this.authServ.signUp(email, password);
        }
        authObs.subscribe(resData => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errMessage => {
            this.error = errMessage;
            this.isLoading = false;
        });
        this.authForm.reset();
    }

}

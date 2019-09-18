import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    @ViewChild('authForm', { static: false }) authForm: NgForm;
    constructor() { }

    ngOnInit(): void { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        console.log(this.authForm.form.controls.email.errors);
        this.authForm.reset();
    }

}

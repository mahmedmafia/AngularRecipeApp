import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
   
    isLoginMode = true;
    @ViewChild('authForm', { static: false }) authForm: NgForm;
    constructor(private authServ: AuthService
        , private router: Router
        , private componentFactoryResolver: ComponentFactoryResolver) { }
    @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;
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
            this.showErrorAlert(errMessage);
        });
        this.authForm.reset();
    }
    onHandleError() {

        this.error = null;
    }
    private closeSub: Subscription;
    private showErrorAlert(errMessage: string) {
        // const alert = new AlertComponent();
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
        );
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const compRef = hostViewContainerRef.createComponent(alertCmpFactory);
        compRef.instance.message = errMessage;
        this.closeSub = compRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();

        });
    }
    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}

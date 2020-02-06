import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromRoot from '../store/app.reducer';
import * as authActions from '../auth/store/auth.action';
import { Store } from '@ngrx/store';
import { getAuthFeatureState } from './store/auth.reducer';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode = true;
    @ViewChild('authForm', { static: false }) authForm: NgForm;
    constructor(
        // tslint:disable-next-line: align
        private router: Router
        // tslint:disable-next-line: align
        , private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromRoot.AppState>) { }
    @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;
    error = null;
    isLoading = false;
    private closeSub: Subscription;
    storeSub: Subscription;
    ngOnInit(): void {
        this.storeSub = this.store.select(getAuthFeatureState).subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        this.isLoading = true;
        const { password, email } = this.authForm.value;
        if (!this.authForm.valid) {
            return;
        }
        if (this.isLoginMode) {
            // Login
            // authObs = this.authServ.login(email, password);
            this.store.dispatch(new authActions.LoginStart({ email, password }));
            console.log('loggin');
        } else {
            // SignUp
            this.store.dispatch(new authActions.SignupStart({ email, password }))
        }

        this.authForm.reset();
    }
    onHandleError() {

        this.store.dispatch(new authActions.ClearError());
    }
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
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
        this.storeSub.unsubscribe();
    }
}

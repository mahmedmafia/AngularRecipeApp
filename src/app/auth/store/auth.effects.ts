import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { AuthResponseData } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const handleAuth = (resData: AuthResponseData) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    return new AuthActions.Login(
        {
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate
        }
    );
}
const handleError = (errRes) => {
    let errMsg = 'An Unknow Error Occured';
    if (!errRes.error || !errRes.error.error) {
        return of(new AuthActions.LoginFail(errMsg));
    }
    switch (errRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errMsg = 'this email exists Already ';
            break;
        case 'EMAIL_NOT_FOUND':
            errMsg = 'Email Not Found';
            break;
        case 'INVALID_PASSWORD':
            errMsg = 'Email Not Found Or Password is Invalid';
            break;
        case 'USER_DISABLED':
            errMsg = 'This Account is Blocked';
            break;
    }
    return of(new AuthActions.LoginFail(errMsg));
}

@Injectable()
export class AuthEffects {
    private API_KEY = environment.firebaseAPIKEY;
    private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
    private loignUrl = ` https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
    @Effect()
    authLogin$ = this.actions$.pipe(

        ofType<AuthActions.LoginStart>(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseData>(this.loignUrl, {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(handleAuth), catchError(handleError)
                );
        })
    );

    @Effect({ dispatch: false })
    authSuccess$ = this.actions$.pipe(
        ofType(AuthActions.LOGIN), tap(() => {
            this.router.navigate(['/']);
        })

    );
    @Effect({ dispatch: false })
    authLogout$ = this.actions$.pipe(
        ofType(AuthActions.LOGOUT), tap(() => {
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    authSignup$ = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START), switchMap((authData: AuthActions.SignupStart) => {
            return this.http
                .post<AuthResponseData>(this.signUpUrl, {
                    // tslint:disable-next-line: object-literal-shorthand
                    email: authData.payload.email,
                    // tslint:disable-next-line: object-literal-shorthand
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(map(handleAuth),catchError(handleError));
        })
    );
}
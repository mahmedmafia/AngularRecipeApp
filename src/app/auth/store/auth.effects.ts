import { Actions, Effect,  ofType } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
const handleAuth = (resData: AuthResponseData) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

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
    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authServ: AuthService) { }
    @Effect()
    authLogin$ = this.actions$.pipe(

        ofType<AuthActions.LoginStart>(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseData>(this.loignUrl, {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(tap((resData) => {
                    this.authServ.setLogoutTimer(+resData.expiresIn * 1000)
                }),
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
            this.authServ.clearLogoutTimer();
            localStorage.removeItem('userData');
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
                }).pipe(tap((resData) => {
                    this.authServ.setLogoutTimer(+resData.expiresIn * 1000);
                }), map(handleAuth), catchError(handleError));
        })
    );

    @Effect()
    autoLogin$ = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            let expirationDuration;
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string,
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: "Dummy" };
            }
            if (userData) {
                const LoggedUser = new User(
                    userData.email
                    , userData.id,
                    userData._token,
                    new Date(userData._tokenExpirationDate));
                if (LoggedUser.token) {
                    expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                    this.authServ.setLogoutTimer(expirationDuration);
                    return new AuthActions.Login(
                        {
                            email: LoggedUser.email,
                            token: LoggedUser.token,
                            userId: LoggedUser.id,
                            expirationDate: new Date(userData._tokenExpirationDate)
                        }
                    );

                    // this.autoLogout(expirationDuration);
                }
            }
            return { type: "Dummy" }
        })
    );
}
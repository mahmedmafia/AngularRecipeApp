import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import * as fromRoot from '../store/app.reducer';
import * as authActions from '../auth/store/auth.action';
import { Store } from '@ngrx/store';
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
    private API_KEY = 'AIzaSyAnuB8j1QiXl9yPQMs2vPKU2mWf6SI2qwI';
    private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
    private loignUrl = ` https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer;
    constructor(private http: HttpClient, private router: Router, private store: Store<fromRoot.AppState>) { }
    signUp(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(this.signUpUrl, {
                // tslint:disable-next-line: object-literal-shorthand
                email: email,
                // tslint:disable-next-line: object-literal-shorthand
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleErr),
                tap(resData => {
                    this.handleAuth(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(this.loignUrl, {
                // tslint:disable-next-line: object-literal-shorthand
                email: email,
                // tslint:disable-next-line: object-literal-shorthand
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleErr),
                tap(resData => {
                    this.handleAuth(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    logout() {
        this.store.dispatch(new authActions.Logout())
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    autoLogout(expirationDuration: number) {

        return this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
    autoLogin() {
        let expirationDuration;
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string,
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        if (userData) {
            const LoggedUser = new User(
                userData.email
                , userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate));
            if (LoggedUser.token) {
                // this.user.next(LoggedUser);
                this.store.dispatch(new authActions.Login({ email: LoggedUser.email, token: LoggedUser.token, userId: LoggedUser.id, expirationDate: new Date(userData._tokenExpirationDate) }))
                expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration);
            }

        }
        console.log((expirationDuration / 1000) / 60);

    }

    private handleAuth(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.store.dispatch(new authActions.Login(
            {
                email: user.email,
                userId: user.id,
                token: user.token,
                expirationDate: expirationDate
            }));
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleErr(errRes: HttpErrorResponse) {
        let errMsg = 'An Unknow Error Occured';
        if (!errRes.error || !errRes.error.error) {
            return throwError(errMsg);
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
        return throwError(errMsg);
    }
}

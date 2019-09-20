import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

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
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient) { }
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


    private handleAuth(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
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

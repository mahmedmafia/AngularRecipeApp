import { Action } from '@ngrx/store';
export const LOGIN_START = '[Auth] Login Start'
export const LOGIN = '[Auth] LOGIN';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';
export const LOGOUT = '[Auth] LOGOUT';
export const CLEAR_ERROR = '[Auth] Clear Error'
export const SIGNUP_START = '[Auth] Login Start';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: { email: string, userId: string, token: string, expirationDate: Date }) { }
}
export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }

}
export class Logout implements Action {
    readonly type = LOGOUT;
}
export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) { }

}
export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: { email: string, password: string }) { }

}
export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}
export type AuthActions = Login | Logout | LoginFail | LoginStart | SignupStart | ClearError;

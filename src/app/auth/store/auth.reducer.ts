import { User } from '../user.model';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AuthActions from './auth.action';

export interface authState {
    user: User;
    authError: string;
    loading: boolean;
};

const initialState: authState = {
    user: null,
    authError: null,
    loading: false,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions): authState {
    switch (action.type) {

        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true,
            }

        case AuthActions.LOGIN:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                authError: null,
                user,
                loading: false,
            };


        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null,
                loading: false,
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
            };
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null,
            };
        default: {
            return state;
        }
    }
}
export const getAuthFeatureState = createFeatureSelector<authState>('auth');
export const getAuthUser = createSelector(getAuthFeatureState, (res: authState) => {
    return res.user;
});
export const getAuthError = createSelector(getAuthFeatureState, (res: authState) => {
    return res.authError;
});
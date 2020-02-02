import { User } from '../user.model';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AuthActions from './auth.action';

export interface authState {
    user: User
};

const initialState: authState = {
    user: null,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions): authState {
    switch (action.type) {


        case AuthActions.LOGIN:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                user
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
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
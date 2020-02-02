import { User } from '../user.model';
import { Action } from '@ngrx/store';


export interface authState {
    user: User
};

const initialState: authState = {
    user: null,
};

export function authReducer(state = initialState, action: Action): authState {
    switch (action.type) {


        default: {
            return state;
        }
    }
}
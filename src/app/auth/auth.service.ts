import { Injectable } from '@angular/core';
import * as fromRoot from '../store/app.reducer';
import * as authActions from '../auth/store/auth.action';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthService {

    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer;
    constructor(private store: Store<fromRoot.AppState>) { }


    setLogoutTimer(expirationDuration: number) {

        return this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new authActions.Logout());
        }, expirationDuration);
    }
    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }



}

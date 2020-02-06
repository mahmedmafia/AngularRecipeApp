import { Injectable } from '@angular/core';
import * as fromRoot from '../store/app.reducer';
import * as authActions from '../auth/store/auth.action';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpParams
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<fromRoot.AppState>) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth')
            .pipe(
                take(1),
                map(res => { return res.user; }),
                exhaustMap(user => {
                    if (!user) {
                        return next.handle(req);
                    } else {
                        const modified = req.clone({
                            params: new HttpParams().set('auth', user.token)
                        });
                        return next.handle(modified);
                    }

                })
            );
    }
}

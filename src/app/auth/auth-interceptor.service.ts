import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpParams
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authServ: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(req);
        return this.authServ.user
            .pipe(
                take(1),
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

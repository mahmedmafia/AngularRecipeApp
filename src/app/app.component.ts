import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

import * as fromRoot from './store/app.reducer';
import * as authActions from './auth/store/auth.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromRoot.AppState>) {

  }
  ngOnInit(): void {
    // this.authServ.autoLogin();
    this.store.dispatch(new authActions.AutoLogin());
  }


}

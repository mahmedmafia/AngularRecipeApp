import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import * as fromRoot from '../store/app.reducer';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { getAuthUser } from '../auth/store/auth.reducer';

import * as authActions from '../auth/store/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedin = false;
  private userSub: Subscription = new Subscription();
  constructor(private datasotreServ: DataStorageService, private store: Store<fromRoot.AppState>) { }
  ngOnInit(): void {
    this.userSub = this.store.select(getAuthUser).subscribe((user) => {
      console.log(user);
      this.isLoggedin = user ? true : false;

    });
  }
  onLogOut() {
    this.store.dispatch(new authActions.Logout());
  }
  onSaveData() {
    this.datasotreServ.storeRecipes();
  }
  onFetchData() {
    this.datasotreServ.fecthRecipes().subscribe();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}


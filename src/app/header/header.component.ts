import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import * as fromRoot from '../store/app.reducer';

import { Store } from '@ngrx/store';
import { getAuthUser } from '../auth/store/auth.reducer';
import * as recipesActions from '../recipes/store/recipes.action';
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
      this.isLoggedin = user ? true : false;

    });
  }
  onLogOut() {
    this.store.dispatch(new authActions.Logout());
  }
  onSaveData() {
    // this.datasotreServ.storeRecipes();
    this.store.dispatch(new recipesActions.StoreRecipes());
  }
  onFetchData() {
    // this.datasotreServ.fecthRecipes().subscribe();
    this.store.dispatch(new recipesActions.LoadRecipes());
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}


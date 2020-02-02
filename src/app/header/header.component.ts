import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedin = false;
  private userSub: Subscription = new Subscription();
  constructor(private datasotreServ: DataStorageService, private authServ: AuthService) { }
  ngOnInit(): void {
    this.userSub = this.authServ.user.subscribe((user) => {
      
        this.isLoggedin = user ? true :false ;
      
    });

  }
  onLogOut() {
    this.authServ.logout();
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


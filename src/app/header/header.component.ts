import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private datasotreServ: DataStorageService) { }

  ngOnInit() {
  }
  onSaveData() {
    this.datasotreServ.storeRecipes();
  }
  onFetchData() {
    this.datasotreServ.fecthRecipes().subscribe();
  }
}

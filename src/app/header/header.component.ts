import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from '../shared/recipes.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private datasotreServ: DataStorageService, private recipeServ: RecipesService) { }

  LogChange() {
    this.recipeServ.onRecipesChange.subscribe((d) => {
      console.log(d);
    });
  }
  onSaveData() {
    this.datasotreServ.storeRecipes();
  }
  onFetchData() {
    this.datasotreServ.fecthRecipes().subscribe();
  }
}

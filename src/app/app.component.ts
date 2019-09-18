import { Component } from '@angular/core';
import { ShoppingListServices } from './shared/shopping-list.services';
import { RecipesService } from './shared/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  currentComp = 'Recipes';


}

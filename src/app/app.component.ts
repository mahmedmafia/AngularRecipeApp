import { Component } from '@angular/core';
import { ShoppingListServices } from './shared/shopping-list.services';
import { RecipesServices } from './shared/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListServices, RecipesServices]
})
export class AppComponent {

  currentComp = 'Recipes';

 


}

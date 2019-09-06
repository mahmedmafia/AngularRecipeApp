import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServices } from '../shared/shopping-list.services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  ingChangeSub: Subscription;
  constructor(private shoppingserv: ShoppingListServices) { }
  onAddIngredient(addedIngredient: Ingredient) {
    this.shoppingserv.addIngredient(addedIngredient);
  }
  ngOnInit() {
    this.ingredients = this.shoppingserv.getIngredients();
    this.ingChangeSub = this.shoppingserv.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
    );
  }
  ngOnDestroy(): void {
    this.ingChangeSub.unsubscribe();
  }
}

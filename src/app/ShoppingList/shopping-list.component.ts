import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServices } from '../shared/shopping-list.services';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [];
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingChangeSub: Subscription;
  constructor(
    private shoppingserv: ShoppingListServices,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) { }
  onAddIngredient(addedIngredient: Ingredient) {
    this.shoppingserv.addIngredient(addedIngredient);
  }
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    this.ingredients.subscribe((res) => {
      console.log(res);
    });
    // this.ingredients = this.shoppingserv.getIngredients();
    // this.ingChangeSub = this.shoppingserv.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }
  ngOnDestroy(): void {
    // this.ingChangeSub.unsubscribe();
  }
  onEditItem(index: number) {
    this.shoppingserv.startEditing.next(index);
  }
}

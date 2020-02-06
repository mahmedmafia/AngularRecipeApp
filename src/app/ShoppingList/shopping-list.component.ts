import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../ShoppingList/store/shopping-list.action';
import * as fromRoot from '../store/app.reducer';
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
    private store: Store<fromRoot.AppState>
  ) { }
  onAddIngredient(addedIngredient: Ingredient) {
    this.store.dispatch(new ShoppingListActions.AddIngredient(addedIngredient));
  }
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients.subscribe((res) => {
    //   console.log(res);
    // });
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
    // this.shoppingserv.startEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from 'src/app/ShoppingList/store/shopping-list.action';
import * as recipeActions from 'src/app/recipes/store/recipes.action';

import * as fromRoot from '../../store/app.reducer';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    // this.store.dispatch(new recipeActions.CancelLoadRecipe());
    this.storeSub.unsubscribe();
    this.store.dispatch(new recipeActions.CancelLoadRecipe());
  }

  recipe: Recipe;
  id;
  storeSub: Subscription;
  // tslint:disable-next-line: max-line-length
  constructor(private store: Store<fromRoot.AppState>, private activeRoute: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.store.dispatch(new recipeActions.LoadRecipe(this.id));
      }
    );

    this.storeSub = this.store.select('recipes').subscribe(res => {
      this.recipe = res.editedRecipe;
      this.id = res.editedRecipedId;
    });
  }
  addToShoppingList() {

    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));

    // tslint:disable-next-line: quotemark
    const result = confirm("Item Added,Do You Want To go to Your shopping list");
    if (result) {
      this.router.navigate(['shoppinglist']);
    }
  }
  onEditRecipe() {

    this.router.navigate([this.recipe.id, 'edit'], { relativeTo: this.activeRoute.parent });
  }
  onDeleteRecipe() {
    this.store.dispatch(new recipeActions.DeleteRecipe(this.id));

    this.router.navigate(['recipes']);
  }
}

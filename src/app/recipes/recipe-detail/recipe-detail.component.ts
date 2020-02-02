import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from 'src/app/shared/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from 'src/app/ShoppingList/store/shopping-list.action';
import * as fromRoot from '../../store/app.reducer';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id;
  // tslint:disable-next-line: max-line-length
  constructor(private store: Store<fromRoot.AppState>, private recipeserv: RecipesService, private activeRoute: ActivatedRoute, private router: Router) { }
  ngOnInit() {

    this.activeRoute.params.subscribe(
      (result: Params) => {
        this.id = +result.id;
        this.recipe = this.recipeserv.getRecipe(this.id);
      }
    );
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
    this.recipeserv.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}

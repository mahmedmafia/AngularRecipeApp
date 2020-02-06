import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipeChangeSub: Subscription;
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    // this.recipeChangeSub = this.recipeServ.onRecipesChange
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       console.log(recipes);
    //       this.recipes = recipes;
    //     }, (err) => { console.log(err); }
    //   );
    // this.recipes = this.recipeServ.getRecipes();
    this.recipeChangeSub = this.store.select('recipes').subscribe(res => {
      this.recipes = res.recipes;
    });
  }
  ngOnDestroy(): void {
    this.recipeChangeSub.unsubscribe();
  }
}

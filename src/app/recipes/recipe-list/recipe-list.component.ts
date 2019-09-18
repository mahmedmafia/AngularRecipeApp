import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { RecipesService} from 'src/app/shared/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeChangeSub: Subscription;
  constructor(private recipeServ: RecipesService) { }

  ngOnInit() {
    this.recipeChangeSub = this.recipeServ.onRecipesChange
      .subscribe(
        (recipes: Recipe[]) => {
          console.log(recipes);
          this.recipes = recipes;
        }, (err) => { console.log(err); }
      );
    this.recipes = this.recipeServ.getRecipes();
  }
  ngOnDestroy(): void {
    this.recipeChangeSub.unsubscribe();
  }
}

import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesServices } from 'src/app/shared/recipes.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeChangeSub: Subscription;
  constructor(private recipeserv: RecipesServices) { }

  ngOnInit(): void {
    this.recipes = this.recipeserv.getRecipes();
    this.recipeChangeSub = this.recipeserv.onRecipesChange.subscribe(
      (data: Recipe[]) => { this.recipes = data; }
    );
  }
  ngOnDestroy(): void {
    this.recipeChangeSub.unsubscribe();
  }
}

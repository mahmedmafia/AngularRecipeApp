import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesServices } from 'src/app/shared/recipes.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeChangeSub: Subscription;
  constructor(private recipeserv: RecipesServices, private dataServ: DataStorageService) { }

  ngOnInit(): void {
    this.recipes = this.recipeserv.getRecipes();
    this.recipeChangeSub = this.recipeserv.onRecipesChange.subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
      });
  }
  ngOnDestroy(): void {
    this.recipeChangeSub.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipesServices } from './recipes.service';
import { tap, map } from 'rxjs/operators';

export class DataStorageService {
    requrl = 'https://ng-recipe-app-46604.firebaseio.com';
    recipesurl = this.requrl + '/recipes.json';
    ingredurl = this.requrl + '/ingredients.json';
    constructor(private http: HttpClient, private recipeServ: RecipesServices) { }

    storeRecipes() {
        const recipes = this.recipeServ.getRecipes();
        console.log(recipes);
        this.http.put(this.recipesurl, recipes).subscribe((response) => {
            console.log(response);
        });
    }
    fecthRecipes() {
        this.http.get<Recipe[]>(this.recipesurl).pipe(map(recipes => {
            const recipesArray: Recipe[] = [];

            recipes.map((recipe) => {
                const newRecipe: Recipe = new Recipe(
                    recipe.id, recipe.name, recipe.description, recipe.imagePath, recipe.ingredients
                );
                recipesArray.push(newRecipe);
            });
            return recipesArray;
        })).subscribe((recipes) => {


            this.recipeServ.setRecipes(recipes as Recipe[]);
        });

    }
}

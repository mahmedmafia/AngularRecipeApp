import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { tap, map, exhaustMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class DataStorageService {
    requrl = 'https://ng-recipe-app-46604.firebaseio.com';
    recipesurl = this.requrl + '/recipes.json';
    ingredurl = this.requrl + '/ingredients.json';
    constructor(private http: HttpClient) { }

    storeRecipes(recipes) {
        return this.http
            .put(
                this.recipesurl,
                recipes
            );
    }
    fecthRecipes() {

        return this.http
            .get<Recipe[]>(
                this.recipesurl
            ).pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            })
            );


    }

    // postRecipe(recipe: Recipe) {
    //     // recipe.id = this.recipeServ.getRecipes().length + 1;
    //     this.recipeServ.addRecipe(recipe);

    //     this.http.post(this.recipesurl, recipe).subscribe((data) => {

    //     });
    // }
}

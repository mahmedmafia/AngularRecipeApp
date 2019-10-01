import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from './recipes.service';
import { tap, map, exhaustMap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({ providedIn: 'root' })

export class DataStorageService {
    requrl = 'https://ng-recipe-app-46604.firebaseio.com';
    recipesurl = this.requrl + '/recipes.json';
    ingredurl = this.requrl + '/ingredients.json';
    constructor(private http: HttpClient,
        // tslint:disable-next-line: align
        private recipeServ: RecipesService,
        // tslint:disable-next-line: align
        private authServ: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeServ.getRecipes();
        this.http
            .put(
                this.recipesurl,
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
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
            }),
                tap(recipes => {
                    this.recipeServ.setRecipes(recipes);
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

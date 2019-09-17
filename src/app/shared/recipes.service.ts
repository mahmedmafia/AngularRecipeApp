import { Recipe } from '../recipes/recipe.model';

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
@Injectable()
export class RecipesServices {

    private recipes: Recipe[] = [
        new Recipe(1,
            'Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(2, 'Big Fat Burger',
            'What else you need to say?',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ];

    // private recipes: Recipe[] = [];
    onRecipesChange = new Subject<Recipe[]>();
    getRecipes(): Recipe[] {

        return this.recipes.slice();
    }
    getRecipe(id: number) {
        return this.recipes.
            find(recipe => recipe.id === id);
        // return recipe;
    }
    addRecipe(newRecipe: Recipe) {

        newRecipe.id = this.recipes.length + 1;
        this.recipes.push(newRecipe);
        this.changeRecipe(this.recipes);
    }
    updateRecipe(id: number, newRecipe: Recipe) {
        const index = this.recipes.findIndex(
            recipe => recipe.id === id
        );
        this.recipes[index] = newRecipe;
        console.log(index);
        this.changeRecipe(this.recipes);

    }
    deleteRecipe(id: number) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        this.recipes.splice(index, 1);
        this.changeRecipe(this.recipes);
    }
    setRecipes(fetchedRecipe: Recipe[]) {
        this.recipes = fetchedRecipe;
        this.changeRecipe(this.recipes);
    }
    private changeRecipe(recipes: Recipe[]) {
        this.onRecipesChange.next(recipes.slice());
    }
}

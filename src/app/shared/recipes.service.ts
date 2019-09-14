import { Recipe } from '../recipes/recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

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

    onRecipesChange = new Subject<Recipe[]>();
    getRecipes() {
        return this.recipes.slice();
    }
    getRecipe(id: number) {
        return this.recipes.
            find(recipe => recipe.id === id);
        // return recipe;
    }
    addRecipe(newRecipe: Recipe) {

        newRecipe.id = this.recipes.length + 1;
        console.log(newRecipe);
        this.recipes.push(newRecipe);
        this.onRecipesChange.next(this.recipes.slice());
    }
    updateRecipe(id: number, newRecipe: Recipe) {
        const index = this.recipes.findIndex(
            recipe => recipe.id === id
        );
        this.recipes[index] = newRecipe;
        console.log(index);
        this.onRecipesChange.next(this.recipes.slice());
    }
}

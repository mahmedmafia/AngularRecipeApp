import { Ingredient } from './ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListServices {
    private ingredients: Ingredient[] = [
        new Ingredient('beach', 10),
        new Ingredient('tomato', 5),
    ];
    ingredientsChanged = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }
    addIngredient(addedIngredient: Ingredient) {
        this.ingredients.push(addedIngredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredientsToShoppingList(addedIngredients: Ingredient[]) {
        this.ingredients.push(...addedIngredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}

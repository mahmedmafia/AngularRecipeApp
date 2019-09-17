import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListServices {
    private ingredients: Ingredient[] = [
        new Ingredient('beach', 10),
        new Ingredient('tomato', 5),
    ];
    ingredientsChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();
    getIngredients() {
        return this.ingredients.slice();
    }
    getIngredient(index: number) {
        return this.ingredients[index];
    }
    addIngredient(addedIngredient: Ingredient) {
        this.ingredients.push(addedIngredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredientsToShoppingList(addedIngredients: Ingredient[]) {
        this.ingredients.push(...addedIngredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());

    }
}

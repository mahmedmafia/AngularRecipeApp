import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.action';
const initialSate = {
    ingredients: [
        new Ingredient('beach', 10),
        new Ingredient('tomato', 5),
    ]
};

export function shoppingListReducer(state = initialSate, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredient: [...state.ingredients, action.payload]
            }

        default:
            break;
    }
}

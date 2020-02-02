import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}
export interface AppState {
    shoppingList: ShoppingListState;

}
const initialSate: ShoppingListState = {
    ingredients: [
        new Ingredient('beach', 10),
        new Ingredient('tomato', 5),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,

};

export function shoppingListReducer(state: ShoppingListState = initialSate, action: ShoppingListActions.ShoppingListActionType) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: { ...state.ingredients[action.payload] },
                editedIngredientIndex: action.payload,
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        default:
            return state;
    }
}
export const getShoppingListFeatureState = createFeatureSelector<ShoppingListState>('shoppingList');
export const getIngredients = createSelector(getShoppingListFeatureState, (state: ShoppingListState) => { return state.ingredients })
export const getSelectedIngredientIndex = createSelector(getShoppingListFeatureState, (state: ShoppingListState) => {
    return state.editedIngredientIndex;
});
export const getSelectedIngredient = createSelector(getShoppingListFeatureState, (state: ShoppingListState) => {
    return state.ingredients[state.editedIngredientIndex];
});
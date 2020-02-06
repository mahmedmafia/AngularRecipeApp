import * as fromShoppingList from '../ShoppingList/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { RecipesEffects } from '../recipes/store/recipes.effects';
import { AuthEffects } from '../auth/store/auth.effects';
export interface AppState {
    shoppingList: fromShoppingList.ShoppingListState;
    auth: fromAuth.authState;
    recipes: fromRecipes.recipesState;
}
export const appReducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipesReducer,
};


import { Recipe } from '../recipe.model';
import { Action } from '@ngrx/store';

export const UPDATE_RECIPE = '[Recipes] update Recipe';
export const ADD_RECIPE = '[Recipes] add Recipe';
export const DELETE_RECIPE = '[Recipes] delete Recipe';
export const LOAD_RECIPE = '[Recipes] load recipe';
export const CANCEL_LOADING_RECIPE = '[Recipes] cancel load';
export const LOAD_RECIPES = '[Recipes] load recipes';
export const LOAD_RECIPES_SUCCESS = '[Recipes] load recipes success';
export const LOAD_RECIPES_FAIL = '[Recipes] load recipes fail';
export const STORE_RECIPES = '[Recipes] store recipes';
export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) { }
}
export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) { }
}
export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: Recipe) { }
}
export class LoadRecipe implements Action {
    readonly type = LOAD_RECIPE;
    constructor(public payload: number) { }
}
export class CancelLoadRecipe implements Action {
    readonly type = CANCEL_LOADING_RECIPE;
}
export class LoadRecipes implements Action {
    readonly type = LOAD_RECIPES;
}
export class LoadRecipesSuccess implements Action {
    readonly type = LOAD_RECIPES_SUCCESS;
    constructor(public payload: Recipe[]) { }
}
export class LoadRecipesFail implements Action {
    readonly type = LOAD_RECIPES_FAIL;
    constructor(public payload: string) { }
}
export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}
export type RecipesActionType = AddRecipe | DeleteRecipe | UpdateRecipe | LoadRecipe | CancelLoadRecipe | LoadRecipes | LoadRecipesSuccess | LoadRecipesFail | StoreRecipes;
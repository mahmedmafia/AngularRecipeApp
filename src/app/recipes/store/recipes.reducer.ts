import { Recipe } from '../recipe.model';
import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as recipeActions from './recipes.action';
import { StartEdit } from 'src/app/ShoppingList/store/shopping-list.action';
import { act } from '@ngrx/effects';
export interface recipesState {
    recipes: Recipe[];
    editedRecipedId: number;
    editedRecipe: Recipe;
    error: string;
};

const initialState: recipesState = {
    recipes: [],
    editedRecipe: null,
    editedRecipedId: -1,
    error: '',
};

export function recipesReducer(state = initialState, action: recipeActions.RecipesActionType): recipesState {
    switch (action.type) {
        case recipeActions.ADD_RECIPE: {
            const latestId = state.recipes.length ? state.recipes[state.recipes.length - 1].id + 1 : 0;
            let newRecipe = { ...action.payload, id: latestId };

            return {
                ...state,
                recipes: [...state.recipes, newRecipe],
            };
        }
        case recipeActions.DELETE_RECIPE: {
            // const index = state.recipes.findIndex(res => res.id == action.payload);
            return {
                ...state,
                recipes: state.recipes.filter(res => res.id != state.editedRecipedId),
                editedRecipedId: -1,
                editedRecipe: null,
            }
        }
        case recipeActions.LOAD_RECIPE: {
            const selectedRecipe = state.recipes.find(res => res.id == action.payload);
            return {
                ...state,
                editedRecipedId: action.payload,
                editedRecipe: { ...selectedRecipe },
            }
        }
        case recipeActions.CANCEL_LOADING_RECIPE: {
            return {
                ...state,
                editedRecipe: null,
                editedRecipedId: -1,
            };
        }
        case recipeActions.UPDATE_RECIPE: {
            const index = state.recipes.findIndex(res => res.id == state.editedRecipedId);
            let updatedrecipes = [...state.recipes];
            updatedrecipes[index] = action.payload;
            console.log(state.recipes);
            console.log(updatedrecipes);
            return {
                ...state,
                recipes: [...updatedrecipes],
                editedRecipe: { ...action.payload }

            }
        }
        case recipeActions.LOAD_RECIPES_SUCCESS: {
            return {
                ...state,
                recipes: [...action.payload],
            };
        }
        case recipeActions.LOAD_RECIPES_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
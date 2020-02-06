import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as recipeActions from '../store/recipes.action';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as fromRoot from '../../store/app.reducer';
@Injectable()
export class RecipesEffects {

    constructor(
        private actions$: Actions,
        private dataStore: DataStorageService,
        private store: Store<fromRoot.AppState>
    ) { }

    @Effect()
    fetchRecipes$: Observable<Action> = this.actions$.pipe(ofType(recipeActions.LOAD_RECIPES),
        switchMap((data: recipeActions.LoadRecipes) => {
            console.log(data);
            return this.dataStore.fecthRecipes()
                .pipe(map(res => {
                    return new recipeActions.LoadRecipesSuccess(res);

                }), catchError(err => of(new recipeActions.LoadRecipesFail(err))));
        }));
    @Effect({ dispatch: false })
    storeRecipes$ = this.actions$.pipe(
        ofType(recipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.dataStore.storeRecipes(recipesState.recipes);
        })
    );
}
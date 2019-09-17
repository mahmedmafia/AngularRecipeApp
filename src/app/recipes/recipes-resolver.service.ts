
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesServices } from '../shared/recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private datastore: DataStorageService, private recipeserv: RecipesServices) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const recipes = this.recipeserv.getRecipes();
        if (recipes.length == 0) {
            return this.datastore.fecthRecipes();

        } else {
            return recipes;
        }
    }
}

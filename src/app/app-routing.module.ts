import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './ShoppingList/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    { path: 'shoppinglist', component: ShoppingListComponent },
    {
        path: 'recipes', component: RecipesComponent, children: [


            {
                path: ':id/details', component: RecipeDetailComponent
                , resolve: [RecipesResolverService]
            },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
            { path: 'new', component: RecipeEditComponent },
            { path: '', component: RecipeStartComponent },

        ]
    },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },

    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

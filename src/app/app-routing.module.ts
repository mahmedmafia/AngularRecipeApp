import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './ShoppingList/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
    { path: 'shoppinglist', component: ShoppingListComponent },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: ':id/details', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent },
            { path: 'new', component: RecipeEditComponent }

            // { path: '', component: RecipeListComponent},
        ]
    },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

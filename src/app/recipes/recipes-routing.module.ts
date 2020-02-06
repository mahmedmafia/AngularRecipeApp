import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivateChild: [AuthGuardService],
        canActivate: [AuthGuardService],
       
         children: [

            {
                path: ':id/details', component: RecipeDetailComponent
                , resolve: [RecipesResolverService]
            },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
            { path: 'new', component: RecipeEditComponent },
            { path: '', component: RecipeStartComponent },

        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {
}

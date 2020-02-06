import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import * as recipeActions from '../store/recipes.action';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
  }
  navigate() {
    // this.store.dispatch(new recipeActions.CancelLoadRecipe());
    this.store.dispatch(new recipeActions.LoadRecipe(this.recipe.id));
    // this.router.navigate([this.recipe.id, 'details',],{relativeTo:this.activeRoute});
    // this.router.navigate(['details','s'],{relativeTo:this.activeRoute});
  }
}

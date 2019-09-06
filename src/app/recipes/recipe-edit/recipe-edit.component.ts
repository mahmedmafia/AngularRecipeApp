import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesServices } from 'src/app/shared/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  editMode: boolean=false;
  recipeName: string = '';
  id:number;
  Title='New';
  constructor(private activeRoute: ActivatedRoute, private recipeserv: RecipesServices) { }

  ngOnInit() {
    // this.activeRoute.queryParams.subscribe(
    //   (params: Params) => {
    //     params.allowEdit == 1 ? this.editMode = true : this.editMode = false;
    //   }
    // );
    // if (this.editMode) {
      this.activeRoute.params.subscribe(
        (params: Params) => {
          this.id=+params.id;
          this.editMode= params.id!=null;
          if(this.editMode){
          this.recipe = this.recipeserv.getRecipe(+params.id);
          this.recipeName = this.recipe.name;
          this.Title='Edit';
          }
        }
      );

    // } else {
    //   this.recipe = new Recipe(0, 's', 's', 's', []);
    // }
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListServices } from 'src/app/shared/shopping-list.services';
import { RecipesServices } from 'src/app/shared/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(private shopingserv: ShoppingListServices, private recipeserv: RecipesServices, private activeRoute: ActivatedRoute,private router:Router) { }
  ngOnInit() {
    
    this.activeRoute.params.subscribe(
      (result: Params) => {
        let id = +result.id
        this.recipe = this.recipeserv.getRecipe(id);
      }
    );
  }
  addToShoppingList() {

    this.shopingserv.addIngredientsToShoppingList(this.recipe.ingredients);
    var result=confirm("Item Added,Do You Want To go to Your shopping list");
    if(result){
      this.router.navigate(['shoppinglist']);
    }
  }
  onEditRecipe(){

    this.router.navigate([this.recipe.id,'edit'],{relativeTo:this.activeRoute.parent});
  }
}

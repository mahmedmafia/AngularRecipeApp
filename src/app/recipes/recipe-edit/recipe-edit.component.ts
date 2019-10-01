import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/shared/recipes.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  id: number;
  Title = 'New';
  recipeForm: FormGroup;
  constructor(private activeRoute: ActivatedRoute, private recipeserv: RecipesService, private router: Router, private dataStore: DataStorageService) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeserv.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              // tslint:disable-next-line: object-literal-key-quotes
              'name': new FormControl(ingredient.name, Validators.required),
              // tslint:disable-next-line: object-literal-key-quotes
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
      this.Title = 'Edit';
    }
    this.recipeForm = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      'id': new FormControl(this.id),
      // tslint:disable-next-line: object-literal-key-quotes
      'name': new FormControl(recipeName, Validators.required),
      // tslint:disable-next-line: object-literal-key-quotes
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      // tslint:disable-next-line: object-literal-key-quotes
      'description': new FormControl(recipeDescription, Validators.required),
      // tslint:disable-next-line: object-literal-key-quotes
      'ingredients': recipeIngredients
    });
  }
  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        // tslint:disable-next-line: object-literal-key-quotes
        'name': new FormControl(null, Validators.required),
        // tslint:disable-next-line: object-literal-key-quotes
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }
  onDeleteIngredient(index) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
  onCancel() {

    if (this.editMode) {
      this.router.navigate([this.id, 'details'], { relativeTo: this.activeRoute.parent });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activeRoute });

    }

  }
  onSubmit() {
    if (this.editMode) {
      this.recipeserv.updateRecipe(this.id, this.recipeForm.value);
    } else {
      // this.recipeserv.addRecipe(this.recipeForm.value);
      this.recipeserv.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
}

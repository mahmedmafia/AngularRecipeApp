import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.onClear();
    this.subscribtion.unsubscribe();
  }
  @ViewChild('f', { static: false }) IngredientForm;
  editMode = false;
  subscribtion: Subscription;
  constructor(
    private store: Store<fromRoot.AppState>
  ) { }

  ngOnInit() {
    this.subscribtion = this.store.select('shoppingList').subscribe(res => {

      let Ingredient = res.editedIngredient;
      if (Ingredient) {
        this.editMode = true;
        this.IngredientForm.form.setValue({
          name: Ingredient.name,
          amount: Ingredient.amount
        });
      } else {
        this.editMode = false;
      }
    });



  }
  onSubmit() {
    let form = this.IngredientForm;
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      // this.shoppingserv.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      // this.shoppingserv.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }
  onDelete() {
    // this.shoppingserv.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  onClear() {
    this.IngredientForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}

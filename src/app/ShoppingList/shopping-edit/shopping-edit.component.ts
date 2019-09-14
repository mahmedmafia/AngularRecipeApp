import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServices } from 'src/app/shared/shopping-list.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f',{static:false}) IngredientForm;
  editMode=false;
  editedItemIndex:number;
  constructor(private shoppingserv: ShoppingListServices) { }

  ngOnInit() {

    this.shoppingserv.startEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        let Ingredient=this.shoppingserv.getIngredient(index);
        this.IngredientForm.form.setValue({
            'name':Ingredient.name,
            'amount':Ingredient.amount,
        });
      }
    );
  }
  onSubmit() {
    let form = this.IngredientForm;
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode){

      this.shoppingserv.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
    this.shoppingserv.addIngredient(newIngredient);
    }
    this.onClear();
  }
  onDelete(){
    this.shoppingserv.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  onClear(){
    this.IngredientForm.reset();
    this.editMode=false;
  }

}

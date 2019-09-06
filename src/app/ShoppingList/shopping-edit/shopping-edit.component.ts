import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServices } from 'src/app/shared/shopping-list.services';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {



  @ViewChild('amountInput', { static: false }) amontInputRef: ElementRef;
  @ViewChild('nameInput', { static: false }) nametInputRef: ElementRef;

  constructor(private shoppingserv: ShoppingListServices) { }

  ngOnInit() {
  }
  onAddItem(e) {
    e.preventDefault();
    const ingName = this.nametInputRef.nativeElement.value;
    const ingAmount = this.amontInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingserv.addIngredient(newIngredient);
  }
}

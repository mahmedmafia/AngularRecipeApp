import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesServices } from '../shared/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

 

  ngOnInit() {
  }

}

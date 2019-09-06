import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  navigate() {
    // this.router.navigate([this.recipe.id, 'details',],{relativeTo:this.activeRoute});
    // this.router.navigate(['details','s'],{relativeTo:this.activeRoute});
  }
}

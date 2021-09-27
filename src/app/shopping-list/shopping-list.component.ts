import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
  ];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getShoppingList();
    this.shoppingService.ingredientsChanged.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    });
  }
  onEditItem(index: number) {
    this.shoppingService.startEditing.next(index);
  }
  // onIngrediantAdded(ingredient: Ingredient) {
  //   
  // }

}

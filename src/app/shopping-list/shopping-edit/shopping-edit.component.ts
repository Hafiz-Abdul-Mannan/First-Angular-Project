import { ElementRef, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('amountInput') amountInput!: ElementRef;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }
  onAddItem() {
    const ingName = this.nameInput.nativeElement.value;
    const ingAmount = this.amountInput.nativeElement.value;
    const newIngrediant = new Ingredient(ingName, ingAmount);
    this.shoppingService.addItem(newIngrediant);
  }

}

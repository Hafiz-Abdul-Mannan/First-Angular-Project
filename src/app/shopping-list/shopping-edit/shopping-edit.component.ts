import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingService) { }
  ngOnInit() {
    this.subscription = this.shoppingService.startEditing.subscribe((index: number) => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIngrediant(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngrediant = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngrediant(this.editItemIndex, newIngrediant)
    } else {
      this.shoppingService.addItem(newIngrediant);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingService.deleteIngrediant(this.editItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

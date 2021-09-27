import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
export class ShoppingService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    startEditing = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
    getShoppingList() {
        return this.ingredients.slice();
    }
    addItem(ingredient: Ingredient) {

        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    getIngrediant(index: number) {
        return this.ingredients[index];
    }
    updateIngrediant(index: number, newIngrediant: Ingredient) {
        this.ingredients[index] = newIngrediant;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngrediant(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
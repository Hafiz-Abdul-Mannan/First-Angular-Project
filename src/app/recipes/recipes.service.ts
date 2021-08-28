import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingService } from "../shopping-list/shopping.service";
@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [new Ingredient('Meat', 1), new Ingredient('French', 20)]),
        new Recipe('Another Recipe', 'This is a second recipe', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
    ];
    recipeSelected = new EventEmitter<Recipe>();
    ingredientSelected = new EventEmitter<Ingredient>();
    constructor(private shoppingService: ShoppingService) {

    }
    getRecipes() {
        return this.recipes.slice();
    }
    addIngrediantsToShoppingList(ingredient: Ingredient[]) {
        this.shoppingService.addIngredients(ingredient);
    }

}
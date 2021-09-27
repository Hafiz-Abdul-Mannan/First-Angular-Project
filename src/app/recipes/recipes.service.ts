import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Subject } from "rxjs";
@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Biryani',
            'Biryani is a mixed rice dish originating among the Muslims of the Indian subcontinent. It is made with Indian spices, rice, and meat usually that of chicken, goat, lamb, prawn, fish, and sometimes, in addition, vegetables such as potatoes in certain regional varieties.',
            'https://www.lieferando.de/foodwiki/uploads/sites/8/2017/05/chicken-biryani-5-1080x961.jpg',
            [new Ingredient('Meat', 1), new Ingredient('French', 20)]),
        new Recipe('Karahi', 'A karahi is a type of thick, circular, and deep cooking pot that originated in the Indian subcontinent. It is used in Indian, Afghan, Pakistani, Bangladeshi, and Nepalese cuisines. Traditionally press-formed from mild steel sheet or made of wrought iron, a karahi resembles a wok with steeper sides.', 'https://www.teaforturmeric.com/wp-content/uploads/2019/08/Pakistani-Chicken-Karahi-3-1024x1536.jpg', [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
    ];
    recipeSelected = new EventEmitter<Recipe>();
    ingredientSelected = new EventEmitter<Ingredient>();
    constructor(private shoppingService: ShoppingService) {

    }
    getRecipes() {
        return this.recipes.slice();
    }
    getRecipe(index: number) {
        return this.recipes[index];
    }
    addIngrediantsToShoppingList(ingredient: Ingredient[]) {
        this.shoppingService.addIngredients(ingredient);
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice())
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.recipeChanged.next(this.recipes.slice());
    }

}
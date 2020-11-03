import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Recipe} from './recipe.model'
@Injectable()
export class RecipeService{
  recipeSelected=new EventEmitter<Recipe>();
  recipesChanged=new EventEmitter<Recipe[]>();
   private recipes: Recipe[]=[
        new Recipe('Meat Loaf','Yummy French meat loaf!!',
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
        [new Ingredient('Meat',2),
      new Ingredient('Onlion and Masalas',5)]),
        new Recipe('Pizza','This is a yummy chicken pizza!!!!!',
        'https://wallpapercave.com/wp/wc1813154.jpg',
        [new Ingredient('Bread',2),
        new Ingredient('Tomato',3),new Ingredient('Salad',4),new Ingredient('Sauce',1)])];

        constructor(private slService:ShoppingListService){}
      getRecipes()
      {
          return this.recipes.slice();
      }
      addIngredientsToShoppingList(ingredients)
      {
        this.slService.addIngredients(ingredients);
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      addRecipe(newRecipe){
        this.recipes.push(newRecipe);
        this.recipesChanged.emit(this.recipes.slice());
      }
      updateRecipe(id,newRecipe){
        this.recipes[id]=newRecipe;
        this.recipesChanged.emit(this.recipes.slice());
      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.emit(this.recipes.slice());
      }
      setRecipes(newRecipe:Recipe[]){
        this.recipes=newRecipe;
        this.recipesChanged.emit(this.recipes.slice());

      }

}
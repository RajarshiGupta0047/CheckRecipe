import { EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model'
export class ShoppingListService{
    send=new EventEmitter<number>();
    ingredientsChanged=new EventEmitter<Ingredient[]>();
   private ingredients: Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
      ];
      getIngredients()
      {
          return this.ingredients.slice();
      }
      onIngredientAdded(ingredient)
      {
          this.ingredients.push(ingredient);
          this.ingredientsChanged.emit(this.ingredients.slice());
      }
      addIngredients(ingredients)
      {
          for(let ingredient of ingredients)
          {
              this.onIngredientAdded(ingredient);
          }
      }
      getItem(index){
          return this.ingredients[index];
       }
       updateItem(index,ingredient){
           this.ingredients[index]=ingredient;
           this.ingredientsChanged.emit(this.ingredients.slice());
       }
       deleteIngredients(index){
           this.ingredients.splice(index,1);
           this.ingredientsChanged.emit(this.ingredients.slice())
       }
}

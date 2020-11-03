import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService{
    constructor(private recipeService:RecipeService,private http:HttpClient){}


    storeData(){
        const recipes=this.recipeService.getRecipes();
        this.http.put('https://recipeshopping-8658a.firebaseio.com/shopping.json',recipes).subscribe(
            (resposeData)=>{
                console.log(resposeData);
            }
        );
    }


fetchData()
{
    this.http.get('https://recipeshopping-8658a.firebaseio.com/shopping.json').subscribe(
        (responseData:[])=>{
            console.log(responseData);
            this.recipeService.setRecipes(responseData);
        }
    );
}
}
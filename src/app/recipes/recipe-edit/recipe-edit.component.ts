import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id;
recipeForm:FormGroup;
  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) { }
editMode=false;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.id=params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    );
  }
  onAddIngredient(){
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name':new FormControl(),
      'amount':new FormControl()
    })
  )
  }

  initForm(){
    let recipeName='';
    let recipeImage='';
    let recipeDeccription='';
    let recipeIngrediants=new FormArray([]);

    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImage=recipe.imagePath;
      recipeDeccription=recipe.description;
      if(recipe['ingredients']){
        for(let item of recipe.ingredients){
          recipeIngrediants.push(
            new FormGroup({
              'name':new FormControl(item.name,Validators.required),
              'amount':new FormControl(item.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }

    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImage,Validators.required),
      'description':new FormControl(recipeDeccription,Validators.required),
      'ingredients':recipeIngrediants

    }
    )

  }
  onSubmit(){
  if(this.editMode){
    this.recipeService.updateRecipe(this.id,this.recipeForm.value);
  }
  else{
    this.recipeService.addRecipe(this.recipeForm.value);
  }
  this.onCancel();
  }
  onCancel()
  {
    this.router.navigate(['../'],{relativeTo:this.route});

  }
  get controls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onDeleteIngredient(i){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}

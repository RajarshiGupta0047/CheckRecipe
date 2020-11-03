import { Component,  OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm:NgForm;
  editedItemIndex;
  editMode=false;
  editedItem:Ingredient;
  constructor(private slService: ShoppingListService) { }
 
  ngOnInit(): void {
    this.slService.send.subscribe(
      (index)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.slService.getItem(index);
        this.slForm.setValue(
          {
            name:this.editedItem.name,
            amount:this.editedItem.amount
          }
        );

      }
    );
  
  }
 onSubmit(f:NgForm)
 {
   const value=f.value;
   const newIngredient=new Ingredient(value.name,value.amount);
   
   if(this.editMode){
     this.slService.updateItem(this.editedItemIndex,newIngredient);
     
   }
   else{
    this.slService.onIngredientAdded(newIngredient);
   }
   this.editMode=false;
   this.slForm.setValue({
     name:'',
     amount:''
   });
   

 }
 onClear(){
   this.slForm.form.reset();
  this.editMode=false;
 }
 onDelete(){
   this.slService.deleteIngredients(this.editedItemIndex);
   this.onClear();
 }

 
}

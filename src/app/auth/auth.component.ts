import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent{
    constructor(private authService:AuthService){}
    isLogin=true;
    isLoading=false;
    
    onSwitchMode(){
        this.isLogin=!this.isLogin;
    }
    onSubmit(f:NgForm){
        if(!f.valid){
            return;
        }
        const email=f.value.email;
        const password=f.value.password;
        this.isLoading=true;

       if(this.isLogin){}
       else{
            this.authService.signup(email,password).subscribe(
                (responseData)=>{
                    console.log(responseData);
                    this.isLoading=false;
                },
                error=>{
                    console.log(error);
                    this.isLoading=false;
                }
    
            );
            }

        
        
        f.reset();
    }

}
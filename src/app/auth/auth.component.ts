import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService,AuthResponseData } from './auth.service';

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent{
    constructor(private authService:AuthService,private router:Router){}
    isLogin=true;
    isLoading=false;
    error:string=null;
    
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
        let authObs: Observable<any>;

       if(this.isLogin){
         authObs=this.authService.logIn(email,password);

       }
       else{
           authObs= this.authService.signup(email,password);
            }
            authObs.subscribe(
                (responseData)=>{
                    console.log(responseData);
                    this.isLoading=false;
                    this.router.navigate(['/recipes']);
                },
                errorRes=>{
                    console.log(errorRes);
                    this.error="An error occurred!!";
                    switch(errorRes.error.error.message)
                    {
                        case 'EMAIL_EXISTS':
                            this.error="This email already exists!!!!";
                            break;
                        case 'INVALID_PASSWORD':
                                this.error="Please enter a correct password!!"
                                break;
                        case 'EMAIL_NOT_FOUND':
                            this.error="There is no user record corresponding to this email!!"
                            break;
                        
                    }
                    
                    this.isLoading=false;
                }
        
            );
        
        
        f.reset();
    }
   

}
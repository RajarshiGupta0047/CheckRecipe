import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';
import {tap} from 'rxjs/operators'
import { Router } from '@angular/router';
export interface AuthResponseData{
    kind?:string;
    idToken:string;
email:string;		
refreshToken:string;
expiresIn:string;	
localId:string;
regisered?:boolean;
}
@Injectable()
export class AuthService{
    tokenExpirationTime:any=null;
    user =new BehaviorSubject<User>(null);
    constructor(private http:HttpClient,private router:Router){}


    signup(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAH6ZZHo45LnpaHtgguKSwWAOblY73JjcQ',
        {
            email:email,
            password:password,
            returnSecureToken:true

        })
        .pipe(tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
            
        }));
    }


    logIn(email,password){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAH6ZZHo45LnpaHtgguKSwWAOblY73JjcQ',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
            
        }));

    }

autoLogin(){
    const userData:{
        email:string,
        id:string,
        _token:string,
        _tokenExpirationDate:string
                    }=JSON.parse(localStorage.getItem('userData'));
                    if(!userData)
                    {
                        return;
                    }
                    const loadedUser=new User(userData.email,userData.id,userData._token
                        ,new Date(userData._tokenExpirationDate));
                        if(loadedUser.token){
                             this.user.next(loadedUser);
                             const expirationDuration=
                             new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
                             this.autoLogout(expirationDuration);
                        }
}


    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTime)
        {
            clearTimeout();
        }
        this.tokenExpirationTime=null;
    }
autoLogout(expirationDuration:number){
this.tokenExpirationTime=setTimeout(()=>{
    console.log("Expiration:"+expirationDuration);
    this.logOut();
},expirationDuration)
}
    private handleAuthentication(email:string,userId:string,idToken:string,expiresIn:number){
        const expirationDate=new Date(
            new Date().getTime() + +expiresIn*1000
        );
        const user=new User(email,userId,idToken,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000)
        localStorage.setItem('userData',JSON.stringify(user));
    }
}
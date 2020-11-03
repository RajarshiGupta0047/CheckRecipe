import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface AuthResponseData{
    idToken:string;
email:string;		
refreshToken:string;
expiresIn:string;	
localId:string;
}
@Injectable()
export class AuthService{
    constructor(private http:HttpClient){}
    signup(email:string,password:string){
       return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAH6ZZHo45LnpaHtgguKSwWAOblY73JjcQ',
        {
            email:email,
            password:password,
            returnSecureToken:true

        });
    }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage-service';

@Component(
    {
        selector:'app-header',
        templateUrl:'./header.component.html'

    })

export class HeaderComponent implements OnInit,OnDestroy{
    isAuthenticated=false;
    userSub:Subscription;
    constructor(private dataStorageService:DataStorageService,private authService:AuthService){}
    ngOnInit(){
        this.userSub=this.authService.user.subscribe(response=>{
            this.isAuthenticated=!!response;
            console.log(!response);
            console.log(!!response);
        });
    }
    onSaveData(){
        this.dataStorageService.storeData();

    }
    onFetchData(){
        this.dataStorageService.fetchData();
    }
    onLogout(){
        this.authService.logOut();
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    
}

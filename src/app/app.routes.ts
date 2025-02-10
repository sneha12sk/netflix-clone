import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './core/components/header/header.component';


export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent
    },
    
    {
        path:"home",
        component:HomeComponent
    },

    {
        path:"header",
        component:HeaderComponent
    },
    {
        path:"",
        loadComponent:()=> import('./pages/login/login.component').then(a=>a.LoginComponent)

    },
   



    
    
];

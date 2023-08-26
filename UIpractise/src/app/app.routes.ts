import { Routes } from "@angular/router";
export const appRoutes:Routes=[
    {path:'',redirectTo: 'home', pathMatch: 'full' },
    {path: '**' }
]
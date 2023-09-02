import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from "./error/error.component";
export const appRoutes:Routes=[
    {path:'', redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent },
    {path: '**',component:ErrorComponent }
]
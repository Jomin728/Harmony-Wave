import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from "./error/error.component";
import { SearchPageComponent } from "./search-page/search-page.component";
export const appRoutes:Routes=[
    {path:'', redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent },
    {path:'search',component:SearchPageComponent},
    {path: '**',component:ErrorComponent }
]
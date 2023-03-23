import { Routes } from "@angular/router";
import { HomePageComponent } from "src/app/pages/home-page/home-page.component";

export const publicLayoutRoutes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomePageComponent,
  },
]

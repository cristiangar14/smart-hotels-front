import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HotelDetailPageComponent } from './pages/hotel-detail-page/hotel-detail-page.component';
import { HotelsPageComponent } from './pages/hotels-page/hotels-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path:'login',
    component: LoginPageComponent,
  },
  {
    path:'home',
    component: HomePageComponent,
  },
  {
    path:'hotels',
    component: HotelsPageComponent,
  },
  {
    path:'hotels/:id',
    component: HotelDetailPageComponent,
  },
  {
    path:'logueado',
    component: HotelsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

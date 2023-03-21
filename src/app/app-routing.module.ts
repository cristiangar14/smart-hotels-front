import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HotelFormComponent } from './components/forms/hotel-form/hotel-form.component';
import { ReservationFormComponent } from './components/forms/reservation-form/reservation-form.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HotelDetailPageComponent } from './pages/hotel-detail-page/hotel-detail-page.component';
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
    path:'reservation/:id',
    component: ReservationFormComponent,
  },
  {
    path:'hotels/:id',
    component: HotelDetailPageComponent,
  },
  {
    path:'createHotel',
    component: HotelFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'reservationsList',
    component: ReservationListComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

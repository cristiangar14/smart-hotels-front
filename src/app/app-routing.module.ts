import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { HotelFormComponent } from './components/forms/hotel-form/hotel-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { ReservationFormComponent } from './components/forms/reservation-form/reservation-form.component';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HotelDetailPageComponent } from './pages/hotel-detail-page/hotel-detail-page.component';
import { ListHotelsComponent } from './components/list-hotels/list-hotels.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { BookingGuard } from './guards/booking.guard';

const routes: Routes = [
   {
     path:'',
     pathMatch: 'full',
     redirectTo: 'home',
   },
  {
    path:'home',
    component: HomePageComponent,
  },
  {
    path:'login',
    component: LoginFormComponent,
  },
  {
    path:'hotels',
    component: ListHotelsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path:'hotels/:id',
    component: HotelDetailPageComponent,
  },
  {
    path:'reservation',
    component: ReservationFormComponent,
    canActivate: [BookingGuard]
  },
  {
    path:'createHotel',
    component: HotelFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'reservationsList',
    component: BookingListComponent,
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HotelDetailPageComponent } from './pages/hotel-detail-page/hotel-detail-page.component';
import { HotelsPageComponent } from './pages/hotels-page/hotels-page.component';
import { ReservationFormComponent } from './components/forms/reservation-form/reservation-form.component';
import { HotelFormComponent } from './components/forms/hotel-form/hotel-form.component';
import { PickerDateFormComponent } from './components/forms/picker-date-form/picker-date-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    HotelDetailPageComponent,
    HotelsPageComponent,
    ReservationFormComponent,
    HotelFormComponent,
    PickerDateFormComponent,
    LoginFormComponent,
    NavComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

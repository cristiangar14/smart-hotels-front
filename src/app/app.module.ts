import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HotelDetailPageComponent } from './pages/hotel-detail-page/hotel-detail-page.component';
import { HotelsPageComponent } from './pages/hotels-page/hotels-page.component';
import { ReservationFormComponent } from './components/forms/reservation-form/reservation-form.component';
import { HotelFormComponent } from './components/forms/hotel-form/hotel-form.component';
import { PickerDateFormComponent } from './components/forms/picker-date-form/picker-date-form.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { CardComponent } from './components/card/card.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './state/app.reducers';
import { EffectsArray } from './state/effects';

//Auth
import { AuthModule } from './auth/auth.module';

// firestore
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { ListHotelsComponent } from './pages/list-hotels/list-hotels.component';
import { EditHotelFormComponent } from './components/forms/edit-hotel-form/edit-hotel-form.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { EditRoomComponent } from './components/forms/edit-room/edit-room.component';
import { FormHotelDetailBookingComponent } from './components/forms/form-hotel-detail-booking/form-hotel-detail-booking.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,
    HotelDetailPageComponent,
    HotelsPageComponent,
    ReservationFormComponent,
    HotelFormComponent,
    PickerDateFormComponent,
    NavComponent,
    DashboardComponent,
    ReservationListComponent,
    CardComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    ListHotelsComponent,
    EditHotelFormComponent,
    RoomListComponent,
    EditRoomComponent,
    FormHotelDetailBookingComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot(EffectsArray),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

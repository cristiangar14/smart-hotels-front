import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HotelDetailPageComponent } from './components/hotel-detail-page/hotel-detail-page.component';
import { HotelsPageComponent } from './components/hotels-page/hotels-page.component';
import { ReservationFormComponent } from './components/forms/reservation-form/reservation-form.component';
import { HotelFormComponent } from './components/forms/hotel-form/hotel-form.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
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
import { ListHotelsComponent } from './components/list-hotels/list-hotels.component';
import { EditHotelFormComponent } from './components/forms/edit-hotel-form/edit-hotel-form.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { EditRoomComponent } from './components/forms/edit-room/edit-room.component';
import { FormHotelDetailBookingComponent } from './components/forms/form-hotel-detail-booking/form-hotel-detail-booking.component';
import { FormFilterHomeComponent } from './components/forms/form-filter-home/form-filter-home.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,
    HotelDetailPageComponent,
    HotelsPageComponent,
    ReservationFormComponent,
    HotelFormComponent,
    NavComponent,
    CardComponent,
    ListHotelsComponent,
    EditHotelFormComponent,
    RoomListComponent,
    EditRoomComponent,
    FormHotelDetailBookingComponent,
    FormFilterHomeComponent,
    BookingListComponent,
    BookingDetailsComponent,
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
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, writeBatch, WriteBatch, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BookingModel } from '../core/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private firestore: Firestore
    ) { }



  createBooking(booking: BookingModel){
    const hotelsRef = collection(this.firestore, 'bookings')
    return new Observable( observer => {
      addDoc(hotelsRef, {...booking}).then( docRef => {
          const bookingCreated = {...booking, id:docRef.id};
          observer.next(bookingCreated);
          observer.complete();
        })
        .catch( error => observer.error(error))

    })
  }
}

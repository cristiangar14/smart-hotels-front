import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, writeBatch, WriteBatch, doc, collectionSnapshots, getDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { BookingModel } from '../core/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private firestore: Firestore
    ) { }


  getBookingById(id:string): Observable<any>{
    const refHotels = collection(this.firestore,'hotels');
    const docRef = doc(refHotels,id)
    return  new Observable( observer => {
      getDoc(docRef).then( resp => {
          const data = resp.data();
          if (!data) {
            observer.error({message: 'Hotel no encontrado'})
          } else {
            observer.next();
            observer.complete();
          }
        })
        .catch( error => observer.error(error))
    })
  }

  getAllBookingsFilter(filter:any): Observable<any>{
      console.log('filter',filter)
      const refHotels = collection(this.firestore,'hotels');
      return collectionSnapshots(refHotels).pipe(
        map(res => res.map(data => {
        const id = data.id
        const docData = data.data()
        return {...docData, id}
    })))
  }

  getAllBookings(): Observable<any>{

    const refHotels = collection(this.firestore,'hotels');
    return collectionSnapshots(refHotels).pipe(map(res => res.map(data => {
      const id = data.id
      const docData = data.data()
      return {...docData, id}

  })))
}



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

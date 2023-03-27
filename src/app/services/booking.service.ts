import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, doc, collectionSnapshots, getDoc, setDoc } from '@angular/fire/firestore';
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
    const refHotels = collection(this.firestore,'bookins');
    const docRef = doc(refHotels,id)
    return  new Observable( observer => {
      getDoc(docRef).then( resp => {
          const data = resp.data();
          if (!data) {
            observer.error({message: 'Reserva no encontrado'})
          } else {
            observer.next();
            observer.complete();
          }
        })
        .catch( error => observer.error(error))
    })
  }

  getAllBookings(): Observable<any>{
    const refHotels = collection(this.firestore,'bookings');
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


  updateRoom(booking:BookingModel, bookingId:string):Observable<any>{
    const {
      responsible,
      start,
      end,
      emergencyContact,
      rangeTimestamp,
      guests,
      roomId,
      hotelId,
      room
    } = booking;

    const dataUpdate: BookingModel =  {
      responsible,
      start,
      end,
      emergencyContact,
      rangeTimestamp,
      guests,
      roomId,
      hotelId,
      room
    };

    const refRooms = collection(this.firestore,'bookings');
    const docRef = doc(refRooms, bookingId);
    return  new Observable( observer => {
      setDoc(docRef, {...dataUpdate}, { merge: true })
      .then(() => {
        observer.next({mesagge: 'create succesfully'});
        observer.complete();
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });

    })

  }

}

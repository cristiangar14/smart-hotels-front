import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, writeBatch, WriteBatch, doc, query, where, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { catchError, forkJoin, from, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { IRoom } from '../core/models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private firestore: Firestore
    ) { }


  getRoomsByHotel(hotelId:string){
    const roomsRef = collection(this.firestore, 'rooms')
    const q = query(roomsRef, where("hotelId", "==", hotelId));
    return new Observable( observer => {
      getDocs(q).then( resp => {

        const data: IRoom[] = [];

        resp.docs.forEach( doc => {
          const docRoom = {...doc.data()}


          const {
              description,
              type,
              capacity,
              available,
              basisCost,
              tax,
              code,
              location,
              hotelId,
          } = docRoom;

          data.push({
            description,
            type,
            capacity,
            available,
            basisCost,
            tax,
            code,
            location,
            hotelId,
            id: doc.id,
          });

        })

          if (data) {
            observer.next(data);
            observer.complete();
          }
        })
        .catch( error => observer.error(error))

    })
  }

  updateRoom(room:IRoom, roomId:string):Observable<any>{

    const {
      description,
      type,
      capacity,
      available,
      basisCost,
      tax,
      code,
      location,
      hotelId,
      id,
    } = room;

    const dataUpdate: IRoom =  {
      description,
      type,
      capacity,
      available,
      basisCost,
      tax,
      code,
      location,
      hotelId,
    };


    const refRooms = collection(this.firestore,'rooms');
    const docRef = doc(refRooms, roomId);
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

  createRooms(rooms: IRoom[], hotelId:string){
    return new Observable( observer => {
      const batch = writeBatch(this.firestore)

      rooms.forEach((room:IRoom) => {
        const roomsRef = collection(this.firestore, 'rooms')
        const ref = doc(roomsRef)
        batch.set(ref, {...room, hotelId})
      })

      batch.commit().then( docRef => {
          observer.next({mesagge: 'create succesfully'});
          observer.complete();
        })
        .catch( error => observer.error(error))

    })
  }


  getAvailableRoomsByHotel(hotelId: string, start: Date, end: Date, numberGuests: number): Observable<any> {
    const refRooms = collection(this.firestore,'rooms');
    const q = query(refRooms, where('hotelId', '==', hotelId), where('available', '==', true), where('capacity', '>=', numberGuests));
    return from(getDocs(q)).pipe(
      mergeMap(querySnapshot => {
        const availableRooms = querySnapshot.docs.filter(doc => {
          const room = doc.data();
          return this.checkRoomAvailability(room['id'], start, end).pipe(map(isAvailable => isAvailable));
        });
        return forkJoin(availableRooms);
      }),
      map(availableRooms => {
        return availableRooms.filter(room => room !== null).map(room => {
          const data = room['data']();
          return {
            id: room.id,
            ...data
          }
        });
      })
    );
  };


  checkRoomAvailability(roomId: string, start: Date, end: Date): Observable<boolean> {
    const refBookings = collection(this.firestore,'bookings');
    const startTimestamp = new Date(start).getTime();
    const endTimestamp = new Date(end).getTime();
    const q = query(refBookings,
      where('roomId', '==', roomId),
      where('rangeTimestamp', '<', endTimestamp),
      where('rangeTimestamp', '>', startTimestamp)
    );

    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.empty),
      catchError(err => {
        console.log('Error fetching bookings: ', err);
        return throwError('Error fetching bookings');
      })
    );
  }

}

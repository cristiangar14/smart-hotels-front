import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, writeBatch, WriteBatch, doc, query, where, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
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
}

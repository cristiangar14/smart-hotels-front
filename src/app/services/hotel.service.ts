import { Injectable } from '@angular/core';
import { delay, distinctUntilChanged, filter, forkJoin, from, map, mergeMap, Observable, of, tap } from 'rxjs';
import { HOTEL_LIST } from '../mocks/hotels.mocks';
import { IHotel } from '../core/models/hotel.interface';
import { Firestore, addDoc, collection, getDoc, doc, query, where, onSnapshot, collectionSnapshots, setDoc, getDocs} from '@angular/fire/firestore';
import { IRoom } from '../core/models/room.model';
import { Store } from '@ngrx/store';
import { Appstate } from '../state/app.reducers';
import { sendCreateRooms } from '../state/actions';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hotelList:IHotel[] = HOTEL_LIST;

  constructor(
    private firestore: Firestore,
    private roomService: RoomService,
    private store:Store<Appstate>
    ) { }


    getHotelById(id:string): Observable<IHotel>{
      const refHotels = collection(this.firestore,'hotels');
      const docRef = doc(refHotels,id)
      return  new Observable( observer => {
        getDoc(docRef).then( resp => {
            const data = resp.data();
            if (!data) {
              observer.error({message: 'Hotel no encontrado'})
            } else {

              const {
                active,
                commonAreas,
                contact,
                coverText,
                images,
                location,
                name,
                numberRooms,
                services
              } = data;

              const hotel: IHotel =  {
                active,
                commonAreas,
                contact,
                coverText,
                images,
                location,
                name,
                numberRooms,
                services,
                id
              };

              observer.next(hotel);
              observer.complete();
            }
          })
          .catch( error => observer.error(error))
      })
    }

    updateHotel(hotel:IHotel): Observable<any>{

      const {
        active,
        commonAreas,
        contact,
        coverText,
        images,
        location,
        name,
        numberRooms,
        services
      } = hotel;

      const dataUpdate: IHotel =  {
        active,
        commonAreas,
        contact,
        coverText,
        images,
        location,
        name,
        numberRooms,
        services
      };

      const refHotels = collection(this.firestore,'hotels');
      const docRef = doc(refHotels,hotel.id)
      return  new Observable( observer => {
        setDoc(docRef, dataUpdate).then( resp => {
          observer.next({message: 'Hotel actualizado correctamente'});
          observer.complete();

          })
          .catch( error => observer.error(error))

      })

    }

    createHotel(hotel:IHotel, newRooms:IRoom[]){
      const hotelsRef = collection(this.firestore, 'hotels')
      return new Observable( observer => {
        addDoc(hotelsRef, {...hotel}).then( docRef => {
          const hotelId = docRef.id
          const hotelCreated = {...hotel, id:docRef.id};
            this.store.dispatch(sendCreateRooms({newRooms, hotelId}))
            observer.next(hotelCreated);
            observer.complete();
          })
          .catch( error => observer.error(error))

      })
    }

    getHotelsDataApi(): Observable<any>{

        const refHotels = collection(this.firestore,'hotels');
        return collectionSnapshots(refHotels).pipe(map(res => res.map(data => {
          const id = data.id
          const docData = data.data()
          return {...docData, id}

      })))
    }


  //   getHotelsFilter(filterForm?:any): Observable<any>{
  //     console.log('filter',filterForm)
  //     const refHotels = collection(this.firestore,'hotels');
  //     const q = query(refHotels, where('active', '==', true))
  //     return collectionSnapshots(q).pipe(
  //       distinctUntilChanged(),
  //       map(res =>
  //         res.map(data => {
  //           const id = data.id
  //           const docData = data.data()

  //           return {...docData, id}
  //         })),
  //       tap( data =>  console.log('tap', data)),
  //     )
  // }



  getHotelsFilter(filterGet:any): Observable<any> {

    if (!filterGet) {
      return of([]);
    }

    const {
      city,
      start,
      end,
      numberGuests
    } = filterGet


    const refHotels = collection(this.firestore,'hotels');
    let q:any ='';

    if (city) {
      q = query(refHotels, where('active', '==', true), where('location.city', '==', city))
    } else {
      q = query(refHotels, where('active', '==', true))
    }
    return from(getDocs(q)).pipe(
      mergeMap(querySnapshot =>
        forkJoin(
          querySnapshot.docs.map(doc =>
            this.getAvailableRoomsByHotel(doc.id, start, end, numberGuests).pipe(
              map(availableRooms => {
                if (availableRooms.length > 0) {
                  const data:any = doc.data();
                  return {
                    ...data,
                    id: doc.id,
                    habitacionesDisponibles: availableRooms
                  };
                }
              })
            )
          )
        )
      ),
      map(data => data.filter(item => item !== undefined))
    );
  }


  getAvailableRoomsByHotel(hotelId: string, start: Date, end: Date, numberGuests: number): Observable<any> {
    const refRooms = collection(this.firestore,'rooms');
    const q = query(refRooms, where('hotelId', '==', hotelId), where('available', '==', true), where('capacity', '>=', numberGuests))
    return from(
        getDocs(q)
      )
      .pipe(
        mergeMap(querySnapshot =>
          from(
            Promise.all(
              querySnapshot.docs.map(doc =>

                this.checkRoomAvailability(doc.id, start, end).pipe(
                  map(isAvailable => {
                    if (isAvailable) {

                      return {
                        id: doc.id,
                        ...doc.data()
                      };
                    } else {
                      return null;
                    }
                  })
                )
              )
            )
          ).pipe(
            map(data => {
              return data.filter(item => item !== null);
            })
          )
        )
      );
  }

  checkRoomAvailability(roomId: string, start: Date, end: Date): Observable<boolean> {
    const refBookings = collection(this.firestore,'bookings');
    const q = query(refBookings,
      where('roomId', '==', roomId),
      where('end', '>', start),
      where('start', '<', end))

    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.empty)
    );
  }
}

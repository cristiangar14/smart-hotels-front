import { Injectable } from '@angular/core';
import { catchError, delay, distinctUntilChanged, filter, forkJoin, from, map, mergeMap, Observable, of, tap, throwError } from 'rxjs';
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


  getHotelsFilter(filterForm?:any): Observable<any>{
      console.log('filter',filterForm)
      const refHotels = collection(this.firestore,'hotels');
      const q = query(refHotels, where('active', '==', true))
      return collectionSnapshots(q).pipe(
        distinctUntilChanged(),
        map(res =>
          res.map(data => {
            const id = data.id
            const docData = data.data()

            return {...docData, id}
          })),
      )
   }

}

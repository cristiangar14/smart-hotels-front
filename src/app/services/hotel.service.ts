import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of } from 'rxjs';
import { HOTEL_LIST } from '../mocks/hotels.mocks';
import { IHotel } from '../core/models/hotel.interface';
import { Firestore, addDoc, collection, getDoc, doc, query, where, onSnapshot, collectionSnapshots, setDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hotelList:IHotel[] = HOTEL_LIST;

  constructor(
    private firestore: Firestore
    ) { }

  getHotelsDataApi(): Observable<any>{

      const refHotels = collection(this.firestore,'hotels');
      return collectionSnapshots(refHotels).pipe(map(res => res.map(data => {
        const id = data.id
        const docData = data.data()
        return {...docData, id}

    })))
  }

  getHotelsFilter(filter:any): Observable<any>{
      console.log('filter',filter)
      const refHotels = collection(this.firestore,'hotels');
      return collectionSnapshots(refHotels).pipe(
        map(res => res.map(data => {
        const id = data.id
        const docData = data.data()
        return {...docData, id}

    })))
  }


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

  createHotel(hotel:IHotel){
    const hotelsRef = collection(this.firestore, 'hotels')
    return new Observable( observer => {
      addDoc(hotelsRef, {...hotel}).then( docRef => {
          const hotelCreated = {...hotel, id:docRef.id};
          observer.next(hotelCreated);
          observer.complete();
        })
        .catch( error => observer.error(error))

    })
  }

}

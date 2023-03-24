import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/core/models/booking.model';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { loadBookings } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})



export class BookingListComponent implements OnInit, OnDestroy {



  ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  bookingsSub: Subscription = new Subscription();
  displayedColumns: string[] = ['hotel', 'nameResponsible', 'start', 'end'];
  dataSource: any = new MatTableDataSource(this.ELEMENT_DATA);
  hotelList: IHotel[] | null = null;

  constructor(
      private store: Store<Appstate>
    ){}

  ngOnInit(): void {
    this.store.dispatch(loadBookings());
    this.store.select('hotelsList').subscribe({
      next: ({hotels}) => this.hotelList  = [...hotels]
    })

    this.bookingsSub = this.store.select('bookingList').subscribe({
      next: ({bookings}) => {
        if (bookings) {
          const data:any = [];

          bookings.forEach((booking: BookingModel) => {
            const hotel = this.getHotelData(booking.hotelId)?.name;
            const start = this.getDateFormatted(booking.start);
            const end = this.getDateFormatted(booking.end);

            const item = {
              nameResponsible : booking.responsible.name,
              start,
              end,
              hotel,
            }
            data.push(item)

          })

          this.dataSource = new MatTableDataSource(data);
        }
      }
    })

  }
  ngOnDestroy(): void {
    this.bookingsSub.unsubscribe();
  }


  getHotelData(id?:string){
    if (this.hotelList && id) {
      return this.hotelList.find((hotel) => hotel.id === id)
    } else {
      return {name: 'No encontrado'}
    }

  }

  getDateFormatted(dateOrigin: any){
    const timestamp = dateOrigin;
    const date = new Date(timestamp.toMillis());

    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

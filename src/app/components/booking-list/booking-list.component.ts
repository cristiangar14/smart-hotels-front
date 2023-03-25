import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/core/models/booking.model';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { loadBookings, loadHotels } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})



export class BookingListComponent implements OnInit, OnDestroy {

  bookingsSub: Subscription = new Subscription();
  displayedColumns: string[] = ['hotel', 'nameResponsible', 'start', 'end', 'actions'];
  dataSource: any;
  hotelList: IHotel[] | null = null;
  loading:boolean = false;

  constructor(
      private store: Store<Appstate>,
      public dialog: MatDialog
    ){}

  ngOnInit(): void {
    this.store.dispatch(loadBookings());
    this.store.dispatch(loadHotels());
    this.store.select('hotelsList').subscribe({
      next: ({hotels}) => this.hotelList  = [...hotels]
    })

    this.bookingsSub = this.store.select('bookingList').subscribe({
      next: ({bookings, loading}) => {
        this.loading = loading
        if (bookings) {
          const data:any = [];

          bookings.forEach((booking: BookingModel) => {
            const hotel = this.getHotelData(booking.hotelId);
            const start = this.getDateFormatted(booking.start);
            const end = this.getDateFormatted(booking.end);


            const item = {
              nameResponsible : booking.responsible.name,
              start,
              end,
              hotel,
              booking
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

  openDialog(item:any) {

    const dialogRef = this.dialog.open(BookingDetailsComponent, {
      data: {item},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

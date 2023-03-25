import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BookingModel } from 'src/app/core/models/booking.model';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { bookingCreated, isLoading, sendCreateBooking, stopLoading } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';
import { selectEndCreateBooking, selectHotel, selectNumberGuestCreateBooking, selectStartCreateBooking } from 'src/app/state/selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-resevation-form',
  templateUrl: './edit-resevation-form.component.html',
  styleUrls: ['./edit-resevation-form.component.scss']
})
export class EditResevationFormComponent {
  booking: any;
  hotelSelect: IHotel | null = null;
  priceBooking: number = 0;
  start: string= '';
  end: string= '';





  documentTypes:{title:string, value:string}[]= [
    {
      title: 'Cedula',
      value: 'CC'
    },
    {
      title: 'T.Identidad',
      value: 'TI'
    }
  ]

  genders:{title:string, value:string}[]= [
    {
      title: 'Masculino',
      value: 'M'
    },
    {
      title: 'Femenino',
      value: 'F'
    },
    {
      title: 'Otro',
      value: 'O'
    }
  ]


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<Appstate>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.hotelSelect = this.data.item.hotel;
    this.booking = this.data.item.booking;

    this.start = this.getDateFormatted(this.booking.start);
    this.end = this.getDateFormatted(this.booking.end);

    console.log(this.booking)

  }

  getPriceBooking(){
    const basic = Number(this.booking.room.basisCost)
    const tax = Number(this.booking.room.basisCost)
    const valueTax = (basic * tax)/100
    this.priceBooking = basic + valueTax;
  }


  getDateFormatted(dateOrigin: any){
    const date = new Date(dateOrigin.seconds * 1000);

    const fechaFormateada1 = date.toLocaleDateString('es-ES',  { day: 'numeric', month: 'short', year: 'numeric' });

    return fechaFormateada1;

  }


}

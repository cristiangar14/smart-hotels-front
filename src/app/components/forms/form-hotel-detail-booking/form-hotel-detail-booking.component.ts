import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { IRoom } from 'src/app/core/models/room.model';
import { IRoomType } from 'src/app/core/models/roomType.interface';
import { ROOMTYPES } from 'src/app/mocks/typesRooms.mocks';
import { getRoomsByHotel, initCreateBooking } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';

@Component({
  selector: 'app-form-hotel-detail-booking',
  templateUrl: './form-hotel-detail-booking.component.html',
  styleUrls: ['./form-hotel-detail-booking.component.scss']
})
export class FormHotelDetailBookingComponent {

  hotelDetailBooking: FormGroup = new FormGroup({});
  errorMessage = {
    start: {
      required: 'La fecha de inicio es requerida.'
    },
    end: {
      required: 'La fecha de fin es requerida.'
    },
    guests: {
      required: 'Este campo es requerido',
      min: 'Debes seleccionar al menos 1 huesped'
    },
    type: {
      required: 'Este campo es requerido'
    },
  }
  hotelSelectsubs: Subscription = new Subscription();
  roomshotelSelectsubs: Subscription = new Subscription();
  maxDate = new Date();
  minDate = new Date().getFullYear() + 1;
  roomTypes: IRoomType[]= ROOMTYPES;
  roomTypesAct: IRoomType[]= [];
  rooms: any = []
  hotelId: any = '';
  typeInit: any = 'SS';
  priceRoom: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<Appstate>
  ){}

  ngOnInit(): void {

    this.hotelSelectsubs = this.store.select('hotel').subscribe({
      next: ({id}) => {
        const hotelId = id
        this.hotelId = id;
        if(hotelId){ this.store.dispatch(getRoomsByHotel({hotelId}))}
      }
    })


    this.roomshotelSelectsubs = this.store.select('getRoomsByHotel').subscribe({
      next: async ({rooms}) => {
        this.rooms = rooms;

        this.changeType();

        const filteredRoomTypes = this.roomTypes.filter(type => {
          return rooms.some(room => room.type == type.code);
        });

        this.roomTypesAct = [...filteredRoomTypes];

      }
    })


    this.hotelDetailBooking = this.formBuilder.group({
      type: [ '' , Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      numberGuests: [1, Validators.compose([Validators.required, Validators.min(1)])],
    })



    this.hotelDetailBooking.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe({
      next: (data) => {
       this.changeType()
    }
    });



  }

  dateFilter = (date: Date): boolean => {
    const currentDate = new Date();
    return date >= currentDate && date <= this.maxDate;
  }

  changeType(){
    this.rooms.forEach((room:IRoom)  => {
      const {type} = this.hotelDetailBooking.value
      if (room.type === type ) {
        const basic = Number(room.basisCost)
        const valueTax = (basic * room.tax)/100
        this.priceRoom = basic + valueTax;
      }
    })
  }


  /**

  Método para validar si un campo es inválido y mostrar su respectivo error
  @param formControlName Nombre del campo
  @param form Grupo de formulario que contiene el campo
  @returns Mensaje de error en caso de que el campo sea inválido
  */
  isFieldInvalid(formControlName: string, error: string): boolean {
    const control = this.hotelDetailBooking.get(formControlName);
    if (!control) { return true; }
    const hasError = control.hasError(error);
    const isTouched = control.touched || control.dirty;
    return hasError && isTouched;
  }

  onSubmit() {
    if (this.hotelDetailBooking.valid) {

      const {start, end, numberGuests, type} = this.hotelDetailBooking.value
      const room = this.rooms.find((el: IRoom) => el.type == type)

      this.store.dispatch(initCreateBooking({start, end, numberGuests, room}))
      this.router.navigate([`./reservation`])
    }

  }


}

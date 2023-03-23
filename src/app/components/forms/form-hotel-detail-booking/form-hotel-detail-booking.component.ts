import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IRoomType } from 'src/app/core/models/roomType.interface';
import { ROOMTYPES } from 'src/app/mocks/typesRooms.mocks';
import { initCreateBooking } from 'src/app/state/actions';
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
    }
  }
  maxDate = new Date();
  minDate = new Date().getFullYear() + 1;
  roomTypes: IRoomType[]= ROOMTYPES;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<Appstate>
  ){}

  ngOnInit(): void {

    this.hotelDetailBooking = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      numberGuests: [1, Validators.compose([Validators.required, Validators.min(1)])],
    })


    // Nos suscribimos a los cambios que ocurran en el formulario
    // this.hotelDetailBooking.valueChanges.subscribe(console.log);


  }

  dateFilter = (date: Date): boolean => {
    const currentDate = new Date();
    return date >= currentDate && date <= this.maxDate;
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
      this.store.dispatch(initCreateBooking({...this.hotelDetailBooking.value}))
      this.router.navigate([`/reservation`])
    }

  }


}

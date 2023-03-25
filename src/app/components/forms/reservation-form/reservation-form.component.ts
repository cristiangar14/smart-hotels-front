import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BookingModel } from 'src/app/core/models/booking.model';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { MailService } from 'src/app/services/mail.service';
import { bookingCreated, isLoading, sendCreateBooking, stopLoading } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';
import { selectEndCreateBooking, selectHotel, selectNumberGuestCreateBooking, selectStartCreateBooking } from 'src/app/state/selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit, OnDestroy {

  booking: any;
  loadinSub: Subscription = new Subscription();
  startSub: Subscription = new Subscription();
  endSub: Subscription = new Subscription();
  numberGuestsSub: Subscription = new Subscription();
  loading: boolean = false;
  hotelSelect: IHotel | null = null;
  end:any
  start:any
  numberGuests: any
  room: any
  created: boolean = false

  //TODO:  la capacidad de la habitacion y restringir la cantidad de pasajeros
  roomCapacity:number = 1;
  disableAddGuest: boolean = false;



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

  formReservation: FormGroup = new FormGroup({});
  errorMessage = {
    name: {
      required: 'El nombre es requerido.',
      minlength: 'El nombre debe tener al menos 5 caracteres.',
      maxlength: 'El nombre no debe exceder los 30 caracteres.'
    },
    email: {
      required: 'El correo electrónico es requerido.',
      email: 'El correo electrónico debe tener un formato válido.'
    },
    gender: {
      required: 'El género es requerido.',
    },
    dateOfBirth: {
      required: 'La fecha de nacimiento es requerida.'
    },
    document: {
      required: 'El documento es requerido.',
      minlength: 'El documento debe tener al menos 5 caracteres.',
      maxlength: 'El documento no debe exceder los 30 caracteres.'
    },
    documentType: {
      required: 'El tipo de documento es requerido.'
    },
    phone: {
      required: 'El número de teléfono es requerido.',
      minlength: 'El número de teléfono debe tener 10 dígitos.',
      maxlength: 'El número de teléfono debe tener 10 dígitos.'
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mailService: MailService,
    private store: Store<Appstate>
  ) { }

  ngOnInit(): void {


    let start: Date | null = null;
    let end: Date | null = null;
    let numberGuests: number | null = null;

    this.store.select('createBooking').subscribe({
      next: ({loading, start, end, numberGuests, created, room}) =>  {
        this.loading = loading
        this.start = start
        this.end = end
        this.numberGuests = numberGuests
        this.created = created
        this.room = room

      }
    })

    this.store.select(selectHotel).subscribe({
      next: (data) =>  data ? this.hotelSelect  = data: null
    })
    if (this.hotelSelect){
      this.store.select(selectStartCreateBooking).subscribe({
        next: (data) =>  data ? start  = data: null
      })
      this.store.select(selectEndCreateBooking).subscribe({
        next: (data) =>  data ? end  = data: null
      })
      this.store.select(selectNumberGuestCreateBooking).subscribe({
        next: (data) =>  data ? numberGuests  = data: null
      })

      this.booking = {
        start,
        end,
      }

    }

    this.loadinSub = this.store.select('ui').subscribe({
      next: (data) =>  this.loading  = data.isLoading
    })


    // se crea el grupo de formulario para los datos del contacto de emergencia
    const emergencyContact = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    })

    this.formReservation = this.formBuilder.group({
      emergencyContact,
      guests: this.formBuilder.array([]),
    })

    this.addGuest()
  }


  ngOnDestroy(): void {
    this.loadinSub.unsubscribe();
    this.endSub.unsubscribe();
    this.startSub.unsubscribe();
    this.numberGuestsSub.unsubscribe();
  }

  /**
   * Getter para obtener la lista de pasajeros
   */
  get guestsForm(): FormArray {
    return this.formReservation.get('guests') as FormArray
  }

  addGuest() {
      this.disableAddGuest = false;
      const passegerNew = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        document: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
        documentType: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      })
      this.guestsForm.push(passegerNew)
  }

  removeGuest(i: number) {
    this.guestsForm.removeAt(i)
  }

  /**

  Método para validar si un campo es inválido y mostrar su respectivo error
  @param formControlName Nombre del campo
  @param form Grupo de formulario que contiene el campo
  @returns Mensaje de error en caso de que el campo sea inválido
  */
  isFieldInvalid(formControlName: string, error: string): boolean {
    const control = this.formReservation.get(formControlName);
    if (!control) { return true; }
    const hasError = control.hasError(error);
    const isTouched = control.touched || control.dirty;
    return hasError && isTouched;
  }

  /**

  Método para obtener el total de pasajeros
  @returns Total de pasajeros
  */
  getTotalGuests(): number {
    return this.guestsForm.length
  }

  removeBtnAdd(){
    this.disableAddGuest = this.room.capacity >= this.guestsForm ? true : false;

  }

  onSubmit() {
    if (this.formReservation.valid) {
      const startTimestamp = new Date(this.start).getTime();
      const endTimestamp = new Date(this.end).getTime();

      const { guests, emergencyContact} = this.formReservation.value;
      const newBooking: BookingModel = {
        guests,
        responsible: guests[0],
        emergencyContact,
        start: new Date(this.start),
        end: new Date(this.end),
        rangeTimestamp: `${startTimestamp}-${endTimestamp}`,
        roomId: this.room.id,
        hotelId: this.hotelSelect?.id,
        room: this.room
      };


      this.store.dispatch(sendCreateBooking({newBooking}))
      this.mailService.sendEmail(newBooking)
      this.store.select(bookingCreated).subscribe({
        next: () => {
            this.router.navigate(['./home'])
          },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: err.message
          })
        },
        complete: () => { this.store.dispatch(stopLoading())}

        }).unsubscribe()

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ooops..',
        text: 'Por favor, revise los campos del formulario'
      })
    }
  }

}

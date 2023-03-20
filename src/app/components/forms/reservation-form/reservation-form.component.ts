import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  //TODO: recibir la capacidad de la habitacion y restringir la cantidad de pasajeros
  roomCapacity:number = 4;
  disableAddPassanger: boolean = false;

  maxDate = new Date();
  minDate = new Date();

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate());
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);

    const emergencyContact = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    })

    this.formReservation = this.formBuilder.group({
      emergencyContact,
      passengers: this.formBuilder.array([]),
    })

    this.addPasseger()
  }

  /**
   * Getter para obtener la lista de pasajeros
   */
  get passengerForm(): FormArray {
    return this.formReservation.get('passengers') as FormArray
  }

  addPasseger() {
      this.disableAddPassanger = false;
      const passegerNew = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        document: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
        documentType: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      })
      this.passengerForm.push(passegerNew)
  }

  removePasseger(i: number) {
    this.passengerForm.removeAt(i)
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
  getTotalPassengers(): number {
    return this.passengerForm.length
  }


  onSubmit() {
    if (this.formReservation.valid) {
      // TODO: enviar datos al servicio
      console.log('Formulario válido')
      console.log(this.formReservation.value)
      this.formReservation.reset();
    } else {
      console.log('Formulario inválido')
      alert('Por favor, revise los campos del formulario')
    }
  }

}

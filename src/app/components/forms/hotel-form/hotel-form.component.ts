import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CITIES } from 'src/app/mocks/cities.mocks';
import { ROOMTYPES } from 'src/app/mocks/typesRooms.mocks';
import { IRoomType } from 'src/app/models/roomType.interface';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent  implements OnInit {

  constructor(
    private formBuilder: FormBuilder
    ){}

  formCreateHotel: FormGroup = new FormGroup({});


  maxDate = new Date();
  minDate = new Date();

  errorMessage = {
    name: {
      required: 'El nombre es requerido.',
      minlength: 'El nombre debe tener al menos 3 caracteres.',
      maxlength: 'El nombre no debe exceder los 30 caracteres.'
    },
    email: {
      required: 'El correo electrónico es requerido.',
      email: 'El correo electrónico debe tener un formato válido.'
    },
    phone: {
      required: 'El número de teléfono es requerido.',
      minlength: 'El número de teléfono debe tener minimo 5 dígitos.',
      maxlength: 'El número de teléfono debe tener maximo 15 dígitos.'
    },
    address: {
      required: 'La dirección es requerida.',
      minlength: 'La dirección debe tener minimo 3 dígitos.',
      maxlength: 'La dirección debe tener maximo 30 dígitos.'
    },
    city: {
      required: 'La ciudad es requerida.',
    },
    coverText: {
      required: 'Este campo es requerido',
      minlength: 'El texto debe tener minimo 10 dígitos.',
      maxlength: 'El texto debe tener maximo 250 dígitos.'
    },
    services: {
      required: 'Este campo es requerido',
      minlength: 'El texto debe tener minimo 10 dígitos.',
      maxlength: 'El texto debe tener maximo 250 dígitos.'
    },
    url: {
      required: 'Este campo es requerido',
      minlength: 'La Url debe tener minimo 10 dígitos.',
    },
    capacity: {
      required: 'Este campo es requerido',
      min: 'La capacidad no pueder ser menor a 1'
    },
    type: {
      required: 'Este campo es requerido'
    },
    basisCost: {
      required: 'Este campo es requerido',
      min: 'El valor no puede ser negativo'
    },
    tax: {
      required: 'Este campo es requerido',
      min: 'El valor no puede ser negativo'
    },
    code: {
      required: 'Este campo es requerido',
      maxlength: 'El codigo debe tener maximo 5 caracteres.'
    },
    location: {
      required: 'Este campo es requerido'
    }
  }

  cities:{name:string, code:string}[]= CITIES;
  roomTypes: IRoomType[]= ROOMTYPES;

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate());
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);

    const commonAreas = this.formBuilder.group({
      pool: false,
      parkingLot: false,
      terrace: false,
      sauna: false,
      jacuzzi: false,
      bar: false,
      restaurant: false,
      campingArea: false,

    })

    const location = this.formBuilder.group({
      address: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      city:['',Validators.required],
    })

    const contact = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email])],
      phone:['',Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
    })

    this.formCreateHotel = this.formBuilder.group({
      active: true,
      name:['',Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      coverText:['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(250)])],
      services:['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(250)])],
      location,
      contact,
      commonAreas,
      rooms: this.formBuilder.array([]),
      images: this.formBuilder.array([]),
    })

    this.addRomms()
    this.addImages()
  }

  /**
   * Getter para obtener la lista de Habitaciones
   */
  get roomsForm(): FormArray {
    return this.formCreateHotel.get('rooms') as FormArray
  }

  addRomms() {
      const newRoom = this.formBuilder.group({
        available: true,
        capacity: [1, Validators.compose([Validators.required, Validators.min(1)])],
        type: ['', Validators.required],
        basisCost: [ 0, Validators.compose([Validators.required, Validators.min(0)])],
        tax: [0, Validators.compose([Validators.required, Validators.min(0)])],
        code: ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
        location: ['', Validators.required],
      })
      this.roomsForm.push(newRoom)
  }

  removeRoom(i: number) {
    this.roomsForm.removeAt(i)
  }

  /**
   * Getter para obtener la lista de imagenes
   */
  get imagesForm(): FormArray {
    return this.formCreateHotel.get('images') as FormArray
  }

  /**

  Método para obtener el total de habitaciones
  @returns Total de habitaciones
  */
  getTotalRooms(): number {
    return this.roomsForm.length
  }


  addImages() {
    const newImage = this.formBuilder.group({
      url: ['', Validators.compose([Validators.required, Validators.minLength(12)])],

    })
    this.imagesForm.push(newImage)
  }

  removeImage(i: number) {
    this.imagesForm.removeAt(i)
  }


  /**

  Método para obtener el total de habitaciones
  @returns Total de habitaciones
  */
  getTotalimages(): number {
    return this.imagesForm.length
  }

  /**

  Método para validar si un campo es inválido y mostrar su respectivo error
  @param formControlName Nombre del campo
  @param form Grupo de formulario que contiene el campo
  @returns Mensaje de error en caso de que el campo sea inválido
  */
  isFieldInvalid(formControlName: string, error: string): boolean {
    const control = this.formCreateHotel.get(formControlName);
    if (!control) { return true; }
    const hasError = control.hasError(error);
    const isTouched = control.touched || control.dirty;
    return hasError && isTouched;
  }




  onSubmit() {
    if (this.formCreateHotel.valid) {
      // TODO: enviar datos al servicio
      console.log('Formulario válido')
      console.log(this.formCreateHotel.value)
      this.formCreateHotel.reset();
    } else {
      console.log('Formulario inválido')
      alert('Por favor, revise los campos del formulario')
    }
  }


}

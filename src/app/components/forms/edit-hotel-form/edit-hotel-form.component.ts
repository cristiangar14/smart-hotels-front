import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CITIES } from 'src/app/mocks/cities.mocks';
import { ROOMTYPES } from 'src/app/mocks/typesRooms.mocks';
import { IRoomType } from 'src/app/core/models/roomType.interface';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/state/app.reducers';
import { IHotel } from 'src/app/core/models/hotel.interface';
import { sendCreateRooms, updateHotel } from 'src/app/state/actions';
import { IRoom } from 'src/app/core/models/room.model';

@Component({
  selector: 'app-edit-hotel-form',
  templateUrl: './edit-hotel-form.component.html',
  styleUrls: ['./edit-hotel-form.component.scss']
})
export class EditHotelFormComponent implements OnInit {

  @Input() hotel:any | null = null;
  enableEdit:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<Appstate>
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
      minlength: 'El texto debe tener minimo 10 caracteres.',
      maxlength: 'El texto debe tener maximo 1000 caracteres.'
    },
    services: {
      required: 'Este campo es requerido',
      minlength: 'El texto debe tener minimo 10 caracteres.',
      maxlength: 'El texto debe tener maximo 1000 caracteres.'
    },
    url: {
      required: 'Este campo es requerido',
      minlength: 'La Url debe tener minimo 10 caracteres.',
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
    },
    description: {
      required: 'Este campo es requerido',
      minlength: 'El texto debe tener minimo 10 caracteres.',
      maxlength: 'El texto debe tener maximo 250 caracteres.'
    }
  }


  cities:{name:string, code:string}[]= CITIES;
  roomTypes: IRoomType[]= ROOMTYPES;

  ngOnInit(): void {
    if (this.hotel) {
      const commonAreas = this.formBuilder.group({ ...this.hotel.commonAreas })

      const location = this.formBuilder.group({
        address: [this.hotel.location.address,Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
        city:[this.hotel.location.city,Validators.required],
      })
      const contact = this.formBuilder.group({
        email: [this.hotel.contact.email,Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email])],
        phone:[this.hotel.contact.phone,Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      })

      this.formCreateHotel = this.formBuilder.group({
        active: this.hotel.active,
        name:[this.hotel.name,Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
        coverText:[this.hotel.coverText,Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
        services:[this.hotel.services,Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
        location,
        contact,
        commonAreas,
        rooms: this.formBuilder.array([]),
        images: this.formBuilder.array([]),
      })

    }


    this.addImagesInitials();
    this.toogleEdit();

  }

  toogleEdit(){
    this.enableEdit = !this.enableEdit;

    if (this.enableEdit) {
      this.formCreateHotel.enable();

    } else {
      this.formCreateHotel.disable();
    }

  }


  addImagesInitials(){
    this.hotel.images.forEach((image:any) => this.addImages(image.url));
  }


  /**
   * Getter para obtener la lista de imagenes
   */
  get imagesForm(): FormArray {
    return this.formCreateHotel.get('images') as FormArray
  }



  addImages(url?:string) {
    const urlImage = url ? url : '';
    const newImage = this.formBuilder.group({
      url: [urlImage, Validators.compose([Validators.required, Validators.minLength(12)])],

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
      basisCost: [ '', Validators.compose([Validators.required, Validators.min(0)])],
      tax: ['', Validators.compose([Validators.required, Validators.min(0)])],
      description:['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(250)])],
      code: ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
      location: ['', Validators.required],
    })
    this.roomsForm.push(newRoom)
}

removeRoom(i: number) {
  this.roomsForm.removeAt(i)
}

 /**

  Método para obtener el total de habitaciones
  @returns Total de habitaciones
  */
  getTotalRooms(): number {
    return this.roomsForm.length
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

      const {
        name,
        coverText,
        services,
        active,
        commonAreas,
        contact,
        location,
        images,
        rooms
      } = this.formCreateHotel.value;

      const hotel: IHotel = {
        name,
        coverText,
        active,
        commonAreas,
        location,
        contact,
        images,
        services,
        numberRooms: this.hotel.numberRooms + rooms.length,
        id:this.hotel.id
      }

      this.store.dispatch(updateHotel({hotel}))
      if(rooms.length){
        const newRooms: IRoom[] = rooms;
        const hotelId: string = this.hotel.id;
        this.store.dispatch(sendCreateRooms({newRooms, hotelId}))
      }

    } else {
      return;
    }
  }


}

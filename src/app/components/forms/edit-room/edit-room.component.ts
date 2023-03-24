import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROOMTYPES } from 'src/app/mocks/typesRooms.mocks';
import { IRoomType } from 'src/app/core/models/roomType.interface';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/state/app.reducers';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRoom } from 'src/app/core/models/room.model';
import { updateRoom } from 'src/app/state/actions';
import { selectSuccessUpdateRoom } from 'src/app/state/selectors/updateRoom.selectors';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent {

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<Appstate>,
    @Inject(MAT_DIALOG_DATA) public data: IRoom,
    ){}

  formEditRoomHotel: FormGroup = new FormGroup({});
  enableEdit: boolean = true;

  errorMessage = {
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
      minlength: 'El texto debe tener minimo 10 dígitos.',
      maxlength: 'El texto debe tener maximo 250 dígitos.'
    }
  }

  roomTypes: IRoomType[]= ROOMTYPES;

  ngOnInit(): void {
    this.formEditRoomHotel = this.formBuilder.group({
      available: this.data.available,
      capacity: [this.data.capacity, Validators.compose([Validators.required, Validators.min(1)])],
      type: [this.data.type, Validators.required],
      basisCost: [ this.data.basisCost, Validators.compose([Validators.required, Validators.min(0)])],
      tax: [this.data.tax, Validators.compose([Validators.required, Validators.min(0)])],
      code: [this.data.code, Validators.compose([Validators.required, Validators.maxLength(5)])],
      description: [this.data.description,Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(250)])],
      location: [this.data.location, Validators.required],
    })
    this.toogleEdit()
  }


  /**

  Método para validar si un campo es inválido y mostrar su respectivo error
  @param formControlName Nombre del campo
  @param form Grupo de formulario que contiene el campo
  @returns Mensaje de error en caso de que el campo sea inválido
  */
  isFieldInvalid(formControlName: string, error: string): boolean {
    const control = this.formEditRoomHotel.get(formControlName);
    if (!control) { return true; }
    const hasError = control.hasError(error);
    const isTouched = control.touched || control.dirty;
    return hasError && isTouched;
  }


  toogleEdit(){
    this.enableEdit = !this.enableEdit;

    if (this.enableEdit) {
      this.formEditRoomHotel.enable();

    } else {
      this.formEditRoomHotel.disable();
    }

  }

  onSubmit() {
    if (this.formEditRoomHotel.valid && this.data.id) {

      const room: IRoom = {...this.formEditRoomHotel.value, hotelId: this.data.hotelId}
      const id = this.data.id
      this.store.dispatch(updateRoom({room, id}))

    } else {
      return;
    }
  }


}
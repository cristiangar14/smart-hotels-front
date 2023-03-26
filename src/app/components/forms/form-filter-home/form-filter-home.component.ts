import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { IRoomType } from 'src/app/core/models/roomType.interface';
import { CITIES } from 'src/app/mocks/cities.mocks';
import { ROOMTYPES } from 'src/app/mocks/typesRooms.mocks';
import { loadHotelsByFilter } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';

@Component({
  selector: 'app-form-filter-home',
  templateUrl: './form-filter-home.component.html',
  styleUrls: ['./form-filter-home.component.scss']
})
export class FormFilterHomeComponent implements OnInit {

  hotelFilter: FormGroup = new FormGroup({});
  errorMessage = {
    guests: {
      min: 'Debes seleccionar al menos 1 huesped'
    },
    type: {
      required: 'Este campo es requerido'
    },
  }

  cities:{name:string, code:string}[]= CITIES;
  roomTypes: IRoomType[]= ROOMTYPES;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<Appstate>
  ){


  }



  ngOnInit(): void {

    this.hotelFilter = this.formBuilder.group({
      type: ['SS', Validators.required],
      start: '',
      end: '',
      numberGuests: [1, Validators.compose([Validators.min(1)])],
      city: ''
    })


    this.hotelFilter.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe({
      next: () => {
        this.onSubmit()
    }
    });
  }


  /**

  Método para validar si un campo es inválido y mostrar su respectivo error
  @param formControlName Nombre del campo
  @param form Grupo de formulario que contiene el campo
  @returns Mensaje de error en caso de que el campo sea inválido
  */
  isFieldInvalid(formControlName: string, error: string): boolean {
    const control = this.hotelFilter.get(formControlName);
    if (!control) { return true; }
    const hasError = control.hasError(error);
    const isTouched = control.touched || control.dirty;
    return hasError && isTouched;
  }

  onSubmit() {
    if (this.hotelFilter.valid) {
      const payload = {...this.hotelFilter.value}
      this.store.dispatch(loadHotelsByFilter({payload}))
    }

  }



}

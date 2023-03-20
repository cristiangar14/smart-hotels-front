import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-picker-date-form',
  templateUrl: './picker-date-form.component.html',
  styleUrls: ['./picker-date-form.component.scss']
})
export class PickerDateFormComponent implements OnInit {

  pickerRangeDate: FormGroup = new FormGroup({});

  errorMessage = {
    start: {
      required: 'La fecha de inicio es requerida.'
    },
    end: {
      required: 'La fecha de fin es requerida.'
    },
  }

  maxDate = new Date();
  minDate = new Date();

  constructor(
      private formBuilder: FormBuilder
    ){}

  ngOnInit(): void {

    this.minDate.setDate(this.maxDate.getDate());
    this.maxDate.setFullYear(this.minDate.getFullYear() + 1);

    // Definimos el validador de fecha personalizado
    const dateRangeValidator = (control: FormGroup): { [key: string]: boolean } | null => {
      const startDate = control.get('start')?.value;
      const endDate = control.get('end')?.value;

      // Obtenemos la fecha actual
      const currentDate = new Date();

      // Verificamos que la fecha de inicio no sea menor a la fecha actual
      if (startDate < currentDate) {
        return { 'startDateInvalid': true };
      }

      // Verificamos que la fecha de inicio no sea mayor a un año
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      if (startDate > maxDate) {
        return { 'startDateOutOfRange': true };
      }

      // Verificamos que la fecha final no sea menor a la fecha de inicio
      if (endDate < startDate) {
        return { 'endDateInvalid': true };
      }

      // Verificamos que la fecha final no sea mayor a un año
      if (endDate > maxDate) {
        return { 'endDateOutOfRange': true };
      }

      return null;
    };

    const range = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    })
    // Iniciamos los campos del formulario y sus valores por defecto
    this.pickerRangeDate = this.formBuilder.group({
      range
    }, { validator: dateRangeValidator });

    // Nos suscribimos a los cambios que ocurran en el formulario
    this.pickerRangeDate.valueChanges.subscribe(console.log);
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
    const control = this.pickerRangeDate.get(formControlName);
    if (!control) { return true; }
    const hasError = control.hasError(error);
    const isTouched = control.touched || control.dirty;
    return hasError && isTouched;
  }

  onSubmit() {
    console.log(this.pickerRangeDate.value);
  }
}

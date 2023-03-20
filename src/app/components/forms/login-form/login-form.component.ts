import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  @Output() loginAction:EventEmitter<{}> = new EventEmitter<{}>();

  hide:boolean = true;
  loginForm : FormGroup = new FormGroup({});


  errorMessage = {
    email: {
      required: 'El correo electrónico es requerido.',
      email: 'El correo electrónico debe tener un formato válido.'
    },
    password: {
      required: 'El nombre es requerido.'
    },

  }


  constructor(
      private formBuilder: FormBuilder
    ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.required]
    })



  }

   /**

  Método para validar si un campo es inválido y mostrar su respectivo error
  @param formControlName Nombre del campo
  @param form Grupo de formulario que contiene el campo
  @returns Mensaje de error en caso de que el campo sea inválido
  */
  isFieldInvalid(formControlName: string, error: string): boolean {
    const control = this.loginForm.get(formControlName);
    if (!control) { return true; }
    const hasError = control.hasError(error);
    const isTouched = control.touched || control.dirty;
    return hasError && isTouched;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginAction.emit(this.loginForm.value)
      console.table(this.loginForm.value)
      this.loginForm.reset();
    } else {
      alert('Por favor, revise los campos del formulario')
    }
  }

}

import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy{


  hide:boolean = true;
  loginForm : FormGroup = new FormGroup({});
  loadinSub: Subscription = new Subscription();
  loading: boolean = false;

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
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private store: Store<Appstate>
    ){}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['prueba@prueba.com', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.required]
    })

    this.loadinSub = this.store.select('ui').subscribe({
      next: (data) =>  this.loading  = data.isLoading
    })

  }

  ngOnDestroy(): void {
    this.loadinSub.unsubscribe();
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
      this.store.dispatch(isLoading())
      let {email, password} = this.loginForm.value

      this.authService.login(email,password).then( data => {
            this.store.dispatch(stopLoading())
            this.router.navigate(['./home'])
          }
        ).catch(err => {
            this.store.dispatch(stopLoading())
            Swal.fire({
              icon: 'error',
              title: 'Ooops..',
              text: err.message
            })
        })
    } else {
      alert('Por favor, revise los campos del formulario')
    }
  }

}

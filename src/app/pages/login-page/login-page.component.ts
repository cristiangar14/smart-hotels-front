import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
      private router: Router,
      private authService: AuthService
    ){}

  ngOnInit(): void {
    let token = sessionStorage.getItem('token')
    if (token) {
      this.router.navigate(['home'])
    }
  }

  loginUser(values:any){
    let {email, password} = values
    this.authService.login(email,password).pipe(

      ).subscribe(
        {
          next: (response) => {
            if (response.token) {
              sessionStorage.setItem('token', response.token)
              this.router.navigate(['hotels'])
            }
          },
          error: ( err:any ) => console.error(`[Error en login]: ${err}`)

        })
  }

}

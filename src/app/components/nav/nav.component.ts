import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/state/app.reducers';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLogued:boolean= false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auht: AuthService,
    private store: Store<Appstate>,
    private router: Router
    ) {}


    ngOnInit(): void {

      this.store.select('auth').subscribe(({user}) => {
          this.isLogued = user ? true: false;

      })

  }
  redirectLogin() {
    // this.updateLoginStatus()
    this.router.navigate(['/login'])
  }

  logout() {
    this.auht.logout()
      .then( resp => {
        sessionStorage.removeItem('token');
        this.router.navigate(['/home']);


      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })

    // this.updateLoginStatus()
  }
}

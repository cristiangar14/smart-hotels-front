import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { loadHotels } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-hotels-front';

  constructor(
      private authService: AuthService,
      private store: Store<any>
  ){
    this.authService.initAuthListener();
    this.store.dispatch(loadHotels())
  }



}

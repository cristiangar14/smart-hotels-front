import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { HotelService } from './services/hotel.service';
import { loadHotels, loadHotelsByFilter } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-hotels-front';

  constructor(
      private authService: AuthService,
      private hotelService: HotelService,
      private store: Store<any>
  ){
    const payload = {
      start: new Date(),
      end: new Date(),
      numberGuests: 1,
      filterActive: true,
    }

    this.authService.initAuthListener();
    //this.hotelService.getHotelsFilter(payload).subscribe(console.log)
    //
    this.store.dispatch(loadHotelsByFilter({payload}))
  }



}

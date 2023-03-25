import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadHotels } from 'src/app/state/actions/hotels.actions';
import { selectLoadind } from 'src/app/state/selectors/hotels.selectors';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{



  constructor(
      private store: Store<any>
    ){}

  ngOnInit(): void {


  }

}

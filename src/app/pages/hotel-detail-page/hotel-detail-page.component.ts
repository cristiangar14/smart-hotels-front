import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHotel } from 'src/app/models/hotel.interface';

@Component({
  selector: 'app-hotel-detail-page',
  templateUrl: './hotel-detail-page.component.html',
  styleUrls: ['./hotel-detail-page.component.scss']
})
export class HotelDetailPageComponent implements OnInit{

  id: string | undefined ;
  hotel: IHotel | undefined;

  constructor(
      private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(
        (params:any) => {
          if (params.id) {
              this.id = params.id;
              console.log(this.id)
          }
        }
    )

    if (history.state.data) {
      this.hotel = history.state.data
    }


  }

}

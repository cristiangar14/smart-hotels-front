import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IHotel } from 'src/app/core/models/hotel.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  @Input() data: any

  dataPrint: {} = {}

  constructor(
    private router: Router,
    ){}
  ngOnInit(): void {
    this.dataPrint = {...this.data}
  }

  passDetail(hotel:IHotel){

    this.router.navigate([`./hotels/${hotel.id}`])
  }
}

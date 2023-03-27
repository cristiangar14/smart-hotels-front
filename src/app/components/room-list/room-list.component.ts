import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRoom } from 'src/app/core/models/room.model';
import { getRoomsByHotel } from 'src/app/state/actions';
import { Appstate } from 'src/app/state/app.reducers';
import { MatDialog } from '@angular/material/dialog';
import { EditRoomComponent } from '../forms/edit-room/edit-room.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  @Input() hotel:any | null = null;

  rooms: IRoom[] = [];
  errorData$: Observable<any> = new Observable();
  loading$: Observable<boolean> = new Observable();
  roomSelect: any = null;

  constructor(
    private store: Store<Appstate>,
    public dialog: MatDialog
    ){
    }

  ngOnInit(): void {
    if (this.hotel) {
      const hotelId = this.hotel.id
      this.store.dispatch(getRoomsByHotel({hotelId}))
      this.store.select('getRoomsByHotel').subscribe(({rooms, loading, error}) => {
        this.rooms = rooms;

      })
    }

  }

  openDialog(i:number) {
    this.roomSelect = this.rooms[i]
    const dialogRef = this.dialog.open(EditRoomComponent, { data: this.roomSelect});
  }

}

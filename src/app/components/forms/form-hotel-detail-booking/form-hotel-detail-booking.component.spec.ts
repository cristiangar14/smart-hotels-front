import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHotelDetailBookingComponent } from './form-hotel-detail-booking.component';

describe('FormHotelDetailBookingComponent', () => {
  let component: FormHotelDetailBookingComponent;
  let fixture: ComponentFixture<FormHotelDetailBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHotelDetailBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHotelDetailBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

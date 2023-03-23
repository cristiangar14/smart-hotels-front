import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHotelFormComponent } from './edit-hotel-form.component';

describe('EditHotelFormComponent', () => {
  let component: EditHotelFormComponent;
  let fixture: ComponentFixture<EditHotelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHotelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHotelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

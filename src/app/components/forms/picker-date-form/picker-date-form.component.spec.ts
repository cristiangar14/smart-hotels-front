import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerDateFormComponent } from './picker-date-form.component';

describe('PickerDateFormComponent', () => {
  let component: PickerDateFormComponent;
  let fixture: ComponentFixture<PickerDateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickerDateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickerDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

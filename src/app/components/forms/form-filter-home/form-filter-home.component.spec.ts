import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFilterHomeComponent } from './form-filter-home.component';

describe('FormFilterHomeComponent', () => {
  let component: FormFilterHomeComponent;
  let fixture: ComponentFixture<FormFilterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFilterHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFilterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

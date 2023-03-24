import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResevationFormComponent } from './edit-resevation-form.component';

describe('EditResevationFormComponent', () => {
  let component: EditResevationFormComponent;
  let fixture: ComponentFixture<EditResevationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResevationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResevationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

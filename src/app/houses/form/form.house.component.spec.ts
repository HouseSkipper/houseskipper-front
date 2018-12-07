import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHouseComponent } from './form.house.component';

describe('FormHouseComponent', () => {
  let component: FormHouseComponent;
  let fixture: ComponentFixture<FormHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

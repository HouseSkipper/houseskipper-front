import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeLoginDialogComponent } from './before-login-dialog.component';

describe('BeforeLoginDialogComponent', () => {
  let component: BeforeLoginDialogComponent;
  let fixture: ComponentFixture<BeforeLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeLoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

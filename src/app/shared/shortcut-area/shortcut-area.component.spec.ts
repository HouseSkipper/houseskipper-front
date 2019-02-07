import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutAreaComponent } from './shortcut-area.component';

describe('ShortcutAreaComponent', () => {
  let component: ShortcutAreaComponent;
  let fixture: ComponentFixture<ShortcutAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

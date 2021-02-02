import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureBookingComponent } from './configure-booking.component';

describe('ConfigureBookingComponent', () => {
  let component: ConfigureBookingComponent;
  let fixture: ComponentFixture<ConfigureBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueBookingFormComponent } from './venue-booking-form.component';

describe('VenueBookingFormComponent', () => {
  let component: VenueBookingFormComponent;
  let fixture: ComponentFixture<VenueBookingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueBookingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCalenderComponent } from './venue-calender.component';

describe('VenueCalenderComponent', () => {
  let component: VenueCalenderComponent;
  let fixture: ComponentFixture<VenueCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

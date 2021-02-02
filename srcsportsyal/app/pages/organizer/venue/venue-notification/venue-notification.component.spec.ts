import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueNotificationComponent } from './venue-notification.component';

describe('VenueNotificationComponent', () => {
  let component: VenueNotificationComponent;
  let fixture: ComponentFixture<VenueNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

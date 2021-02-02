import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuePlayerHeaderComponent } from './venue-player-header.component';

describe('VenuePlayerHeaderComponent', () => {
  let component: VenuePlayerHeaderComponent;
  let fixture: ComponentFixture<VenuePlayerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuePlayerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuePlayerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueConfigureHeaderComponent } from './venue-configure-header.component';

describe('VenueConfigureHeaderComponent', () => {
  let component: VenueConfigureHeaderComponent;
  let fixture: ComponentFixture<VenueConfigureHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueConfigureHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueConfigureHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

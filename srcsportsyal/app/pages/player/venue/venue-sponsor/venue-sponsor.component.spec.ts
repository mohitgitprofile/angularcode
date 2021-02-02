import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSponsorComponent } from './venue-sponsor.component';

describe('VenueSponsorComponent', () => {
  let component: VenueSponsorComponent;
  let fixture: ComponentFixture<VenueSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

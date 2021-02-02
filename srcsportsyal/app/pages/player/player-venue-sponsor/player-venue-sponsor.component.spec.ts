import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerVenueSponsorComponent } from './player-venue-sponsor.component';

describe('PlayerVenueSponsorComponent', () => {
  let component: PlayerVenueSponsorComponent;
  let fixture: ComponentFixture<PlayerVenueSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerVenueSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerVenueSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

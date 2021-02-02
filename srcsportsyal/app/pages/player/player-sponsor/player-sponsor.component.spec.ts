import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSponsorComponent } from './player-sponsor.component';

describe('PlayerSponsorComponent', () => {
  let component: PlayerSponsorComponent;
  let fixture: ComponentFixture<PlayerSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

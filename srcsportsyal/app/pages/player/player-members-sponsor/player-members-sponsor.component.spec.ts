import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMembersSponsorComponent } from './player-members-sponsor.component';

describe('PlayerMembersSponsorComponent', () => {
  let component: PlayerMembersSponsorComponent;
  let fixture: ComponentFixture<PlayerMembersSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMembersSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMembersSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

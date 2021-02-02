import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMediaDetailComponent } from './player-media-detail.component';

describe('PlayerMediaDetailComponent', () => {
  let component: PlayerMediaDetailComponent;
  let fixture: ComponentFixture<PlayerMediaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMediaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMediaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

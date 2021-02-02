import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingAndFixtureComponent } from './standing-and-fixture.component';

describe('StandingAndFixtureComponent', () => {
  let component: StandingAndFixtureComponent;
  let fixture: ComponentFixture<StandingAndFixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandingAndFixtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingAndFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

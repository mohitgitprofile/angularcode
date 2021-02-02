import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCompConfSportsComponent } from './menu-comp-conf-sports.component';

describe('MenuCompConfSportsComponent', () => {
  let component: MenuCompConfSportsComponent;
  let fixture: ComponentFixture<MenuCompConfSportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCompConfSportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCompConfSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

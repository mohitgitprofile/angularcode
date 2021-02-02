import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCompConfPeriodComponent } from './menu-comp-conf-period.component';

describe('MenuCompConfPeriodComponent', () => {
  let component: MenuCompConfPeriodComponent;
  let fixture: ComponentFixture<MenuCompConfPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCompConfPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCompConfPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

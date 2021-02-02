import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCompConfPlanComponent } from './menu-comp-conf-plan.component';

describe('MenuCompConfPlanComponent', () => {
  let component: MenuCompConfPlanComponent;
  let fixture: ComponentFixture<MenuCompConfPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCompConfPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCompConfPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

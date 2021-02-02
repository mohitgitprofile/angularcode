import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCompConfDivisionComponent } from './menu-comp-conf-division.component';

describe('MenuCompConfDivisionComponent', () => {
  let component: MenuCompConfDivisionComponent;
  let fixture: ComponentFixture<MenuCompConfDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCompConfDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCompConfDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

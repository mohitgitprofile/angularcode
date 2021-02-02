import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCompConfUserComponent } from './menu-comp-conf-user.component';

describe('MenuCompConfUserComponent', () => {
  let component: MenuCompConfUserComponent;
  let fixture: ComponentFixture<MenuCompConfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCompConfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCompConfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

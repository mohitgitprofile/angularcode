import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCompConfHeaderComponent } from './menu-comp-conf-header.component';

describe('MenuCompConfHeaderComponent', () => {
  let component: MenuCompConfHeaderComponent;
  let fixture: ComponentFixture<MenuCompConfHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCompConfHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCompConfHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

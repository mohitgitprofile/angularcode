import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubadminComponent } from './view-subadmin.component';

describe('ViewSubadminComponent', () => {
  let component: ViewSubadminComponent;
  let fixture: ComponentFixture<ViewSubadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

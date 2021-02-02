import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenDashboardComponent } from './ven-dashboard.component';

describe('VenDashboardComponent', () => {
  let component: VenDashboardComponent;
  let fixture: ComponentFixture<VenDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { storingPlanComponent } from './storing.component';

describe('StoringComponent', () => {
  let component: storingPlanComponent;
  let fixture: ComponentFixture<storingPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ storingPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(storingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

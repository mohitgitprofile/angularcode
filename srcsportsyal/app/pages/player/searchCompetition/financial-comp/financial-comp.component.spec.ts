import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialCompComponent } from './financial-comp.component';

describe('FinancialCompComponent', () => {
  let component: FinancialCompComponent;
  let fixture: ComponentFixture<FinancialCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialMemComponent } from './financial-mem.component';

describe('FinancialMemComponent', () => {
  let component: FinancialMemComponent;
  let fixture: ComponentFixture<FinancialMemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialMemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialMemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

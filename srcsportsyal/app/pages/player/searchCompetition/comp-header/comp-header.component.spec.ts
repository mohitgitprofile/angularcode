import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompHeaderComponent } from './comp-header.component';

describe('CompHeaderComponent', () => {
  let component: CompHeaderComponent;
  let fixture: ComponentFixture<CompHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

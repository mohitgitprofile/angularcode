import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSectionComponent } from './comp-section.component';

describe('CompSectionComponent', () => {
  let component: CompSectionComponent;
  let fixture: ComponentFixture<CompSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

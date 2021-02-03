import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessiblityOptionComponent } from './accessiblity-option.component';

describe('AccessiblityOptionComponent', () => {
  let component: AccessiblityOptionComponent;
  let fixture: ComponentFixture<AccessiblityOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessiblityOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessiblityOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

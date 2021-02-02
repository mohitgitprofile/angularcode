import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompConfirmComponent } from './comp-confirm.component';

describe('CompConfirmComponent', () => {
  let component: CompConfirmComponent;
  let fixture: ComponentFixture<CompConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

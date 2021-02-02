import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompConfigureComponent } from './comp-configure.component';

describe('CompConfigureComponent', () => {
  let component: CompConfigureComponent;
  let fixture: ComponentFixture<CompConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

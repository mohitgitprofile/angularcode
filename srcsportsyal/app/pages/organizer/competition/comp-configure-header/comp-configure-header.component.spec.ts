import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompConfigureHeaderComponent } from './comp-configure-header.component';

describe('CompConfigureHeaderComponent', () => {
  let component: CompConfigureHeaderComponent;
  let fixture: ComponentFixture<CompConfigureHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompConfigureHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompConfigureHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuemedialistComponent } from './venuemedialist.component';

describe('VenuemedialistComponent', () => {
  let component: VenuemedialistComponent;
  let fixture: ComponentFixture<VenuemedialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuemedialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuemedialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

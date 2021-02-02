import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSlotsComponent } from './venue-slots.component';

describe('VenueSlotsComponent', () => {
  let component: VenueSlotsComponent;
  let fixture: ComponentFixture<VenueSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenHeaderComponent } from './ven-header.component';

describe('VenHeaderComponent', () => {
  let component: VenHeaderComponent;
  let fixture: ComponentFixture<VenHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenListComponent } from './ven-list.component';

describe('VenListComponent', () => {
  let component: VenListComponent;
  let fixture: ComponentFixture<VenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMatchesComponent } from './data-matches.component';

describe('DataMatchesComponent', () => {
  let component: DataMatchesComponent;
  let fixture: ComponentFixture<DataMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

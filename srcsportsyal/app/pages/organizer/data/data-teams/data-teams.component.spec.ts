import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTeamsComponent } from './data-teams.component';

describe('DataTeamsComponent', () => {
  let component: DataTeamsComponent;
  let fixture: ComponentFixture<DataTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

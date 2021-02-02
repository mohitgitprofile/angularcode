import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlayersComponent } from './data-players.component';

describe('DataPlayersComponent', () => {
  let component: DataPlayersComponent;
  let fixture: ComponentFixture<DataPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

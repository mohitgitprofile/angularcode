import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcommunityComponent } from './viewcommunity.component';

describe('ViewcommunityComponent', () => {
  let component: ViewcommunityComponent;
  let fixture: ComponentFixture<ViewcommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

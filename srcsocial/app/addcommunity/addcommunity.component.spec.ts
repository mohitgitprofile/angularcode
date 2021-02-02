import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommunityComponent } from './addcommunity.component';

describe('AddcommunityComponent', () => {
  let component: AddcommunityComponent;
  let fixture: ComponentFixture<AddcommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

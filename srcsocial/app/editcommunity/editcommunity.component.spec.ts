import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcommunityComponent } from './editcommunity.component';

describe('EditcommunityComponent', () => {
  let component: EditcommunityComponent;
  let fixture: ComponentFixture<EditcommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

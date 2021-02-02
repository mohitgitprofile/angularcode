import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcontentpostComponent } from './viewcontentpost.component';

describe('ViewcontentpostComponent', () => {
  let component: ViewcontentpostComponent;
  let fixture: ComponentFixture<ViewcontentpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcontentpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcontentpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

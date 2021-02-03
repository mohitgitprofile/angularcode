import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticContentEditComponent } from './static-content-edit.component';

describe('StaticContentEditComponent', () => {
  let component: StaticContentEditComponent;
  let fixture: ComponentFixture<StaticContentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticContentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticContentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

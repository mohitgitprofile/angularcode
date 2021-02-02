import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMessageDetailComponent } from './comp-message-detail.component';

describe('CompMessageDetailComponent', () => {
  let component: CompMessageDetailComponent;
  let fixture: ComponentFixture<CompMessageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompMessageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompMessageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

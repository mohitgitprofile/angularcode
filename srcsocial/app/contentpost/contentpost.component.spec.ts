import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentpostComponent } from './contentpost.component';

describe('ContentpostComponent', () => {
  let component: ContentpostComponent;
  let fixture: ComponentFixture<ContentpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedPostsComponent } from './med-posts.component';

describe('MedPostsComponent', () => {
  let component: MedPostsComponent;
  let fixture: ComponentFixture<MedPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

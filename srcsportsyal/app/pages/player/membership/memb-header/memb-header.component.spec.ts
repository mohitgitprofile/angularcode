import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembHeaderComponent } from './memb-header.component';

describe('MembHeaderComponent', () => {
  let component: MembHeaderComponent;
  let fixture: ComponentFixture<MembHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

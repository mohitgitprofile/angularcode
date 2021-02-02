import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycActionPageComponent } from './kyc-action-page.component';

describe('KycActionPageComponent', () => {
  let component: KycActionPageComponent;
  let fixture: ComponentFixture<KycActionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycActionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

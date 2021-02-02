import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakerMakerFeeComponent } from './taker-maker-fee.component';

describe('TakerMakerFeeComponent', () => {
  let component: TakerMakerFeeComponent;
  let fixture: ComponentFixture<TakerMakerFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakerMakerFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakerMakerFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

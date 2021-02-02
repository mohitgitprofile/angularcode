import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteContentSettingComponent } from './website-content-setting.component';

describe('WebsiteContentSettingComponent', () => {
  let component: WebsiteContentSettingComponent;
  let fixture: ComponentFixture<WebsiteContentSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteContentSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteContentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

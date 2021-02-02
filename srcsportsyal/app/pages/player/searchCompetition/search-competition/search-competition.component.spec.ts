import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompetitionComponent } from './search-competition.component';

describe('SearchCompetitionComponent', () => {
  let component: SearchCompetitionComponent;
  let fixture: ComponentFixture<SearchCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

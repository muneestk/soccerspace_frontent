import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTournamentListComponent } from './single-tournament-list.component';

describe('SingleTournamentListComponent', () => {
  let component: SingleTournamentListComponent;
  let fixture: ComponentFixture<SingleTournamentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleTournamentListComponent]
    });
    fixture = TestBed.createComponent(SingleTournamentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

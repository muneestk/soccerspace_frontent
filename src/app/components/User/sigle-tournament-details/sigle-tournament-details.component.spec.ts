import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigleTournamentDetailsComponent } from './sigle-tournament-details.component';

describe('SigleTournamentDetailsComponent', () => {
  let component: SigleTournamentDetailsComponent;
  let fixture: ComponentFixture<SigleTournamentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigleTournamentDetailsComponent]
    });
    fixture = TestBed.createComponent(SigleTournamentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

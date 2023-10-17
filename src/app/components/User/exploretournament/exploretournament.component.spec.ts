import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploretournamentComponent } from './exploretournament.component';

describe('ExploretournamentComponent', () => {
  let component: ExploretournamentComponent;
  let fixture: ComponentFixture<ExploretournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploretournamentComponent]
    });
    fixture = TestBed.createComponent(ExploretournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

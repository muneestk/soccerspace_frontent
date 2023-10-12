import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTournamentComponent } from './register-tournament.component';

describe('RegisterTournamentComponent', () => {
  let component: RegisterTournamentComponent;
  let fixture: ComponentFixture<RegisterTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTournamentComponent]
    });
    fixture = TestBed.createComponent(RegisterTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

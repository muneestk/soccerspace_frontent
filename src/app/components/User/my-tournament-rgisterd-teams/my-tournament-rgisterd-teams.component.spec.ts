import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTournamentRgisterdTeamsComponent } from './my-tournament-rgisterd-teams.component';

describe('MyTournamentRgisterdTeamsComponent', () => {
  let component: MyTournamentRgisterdTeamsComponent;
  let fixture: ComponentFixture<MyTournamentRgisterdTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTournamentRgisterdTeamsComponent]
    });
    fixture = TestBed.createComponent(MyTournamentRgisterdTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

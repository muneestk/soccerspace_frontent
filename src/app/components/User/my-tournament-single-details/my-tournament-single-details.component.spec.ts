import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTournamentSingleDetailsComponent } from './my-tournament-single-details.component';

describe('MyTournamentSingleDetailsComponent', () => {
  let component: MyTournamentSingleDetailsComponent;
  let fixture: ComponentFixture<MyTournamentSingleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTournamentSingleDetailsComponent]
    });
    fixture = TestBed.createComponent(MyTournamentSingleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

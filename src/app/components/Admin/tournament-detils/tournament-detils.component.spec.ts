import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetilsComponent } from './tournament-detils.component';

describe('TournamentDetilsComponent', () => {
  let component: TournamentDetilsComponent;
  let fixture: ComponentFixture<TournamentDetilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentDetilsComponent]
    });
    fixture = TestBed.createComponent(TournamentDetilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

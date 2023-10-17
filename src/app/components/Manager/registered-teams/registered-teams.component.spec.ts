import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredTeamsComponent } from './registered-teams.component';

describe('RegisteredTeamsComponent', () => {
  let component: RegisteredTeamsComponent;
  let fixture: ComponentFixture<RegisteredTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredTeamsComponent]
    });
    fixture = TestBed.createComponent(RegisteredTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

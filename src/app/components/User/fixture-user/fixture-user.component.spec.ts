import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureUserComponent } from './fixture-user.component';

describe('FixtureUserComponent', () => {
  let component: FixtureUserComponent;
  let fixture: ComponentFixture<FixtureUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixtureUserComponent]
    });
    fixture = TestBed.createComponent(FixtureUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

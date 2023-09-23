import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSignupComponent } from './manager-signup.component';

describe('ManagerSignupComponent', () => {
  let component: ManagerSignupComponent;
  let fixture: ComponentFixture<ManagerSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerSignupComponent]
    });
    fixture = TestBed.createComponent(ManagerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

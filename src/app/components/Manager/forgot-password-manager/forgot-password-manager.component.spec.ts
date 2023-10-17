import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordManagerComponent } from './forgot-password-manager.component';

describe('ForgotPasswordManagerComponent', () => {
  let component: ForgotPasswordManagerComponent;
  let fixture: ComponentFixture<ForgotPasswordManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordManagerComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyManagerComponent } from './verify-manager.component';

describe('VerifyManagerComponent', () => {
  let component: VerifyManagerComponent;
  let fixture: ComponentFixture<VerifyManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyManagerComponent]
    });
    fixture = TestBed.createComponent(VerifyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
